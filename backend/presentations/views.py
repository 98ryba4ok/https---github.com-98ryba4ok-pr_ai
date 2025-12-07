from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.core.files.base import ContentFile
from django.conf import settings
import json, traceback
from django.http import FileResponse, Http404

from .models import PresentationTemplate, UserPresentation
from .serializers import (
    PresentationTemplateSerializer,
    UserPresentationSerializer,
    UserPresentationCreateSerializer
)
from gigachat import GigaChat
from .utils.pptx_utils import fill_pptx_template
from .utils.image_search import search_image_urls


class PresentationTemplateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PresentationTemplate.objects.all()
    serializer_class = PresentationTemplateSerializer
    def get_serializer(self, *args, **kwargs):
        # Добавляем request в context
        kwargs.setdefault('context', {}).update({'request': self.request})
        return super().get_serializer(*args, **kwargs)


class UserPresentationViewSet(viewsets.ModelViewSet):
    serializer_class = UserPresentationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserPresentation.objects.filter(user=self.request.user)
    
  
    def perform_create(self, serializer):
        user = self.request.user

        # Проверка пробных генераций перед созданием презентации
        if user.trial_generations <= 0:
            raise PermissionDenied("Закончились пробные генерации")

        serializer.save(user=user)

    def get_serializer_class(self):
        if self.action == "create":
            return UserPresentationCreateSerializer
        return UserPresentationSerializer

    @action(detail=True, methods=["post"])
    def generate(self, request, pk=None):
        """Генерация JSON-структуры презентации без уменьшения trial_generations"""
        presentation = self.get_object()
        user_prompt = request.data.get("user_prompt", "").strip()
        image_prompt = request.data.get("image_prompt", "").strip()

        # сохраняем только здесь
        presentation.user_prompt = user_prompt
        presentation.image_prompt = image_prompt

        template_prompt = presentation.template.prompt.strip()
        full_prompt = (
            f"{template_prompt}\n\n"
            f"Дополнение от пользователя:\n{user_prompt}\n\n"
            "Сгенерируй презентацию в JSON формате: "
            "каждый слайд содержит номер, заголовок и описание. Ответ строго JSON."
        )
        presentation.full_prompt = full_prompt

        try:
            giga = GigaChat(
                credentials=settings.GIGACHAT_CREDENTIALS,
                scope="GIGACHAT_API_PERS",
                model="GigaChat-2",
                verify_ssl_certs=False
            )
            response = giga.chat(f"Ты создаёшь JSON-структуру презентации.\n{full_prompt}")
            raw = response.choices[0].message.content

            # Очистка ```json блока
            if raw.startswith("```") and raw.endswith("```"):
                lines = raw.split("\n")
                if lines and lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].startswith("```"):
                    lines = lines[:-1]
                raw = "\n".join(lines).strip()

            try:
                parsed = json.loads(raw)
            except json.JSONDecodeError:
                parsed = {"error": "GigaChat вернул невалидный JSON", "raw": raw}

            # Если GigaChat вернул ошибку (невалидный JSON или явную ошибку),
            # удаляем созданный UserPresentation чтобы не оставлять пустые сущности.
            if isinstance(parsed, dict) and parsed.get("error"):
                try:
                    pres_id = presentation.id
                    presentation.delete()
                    print(f"[PresentationGenerate] Deleted presentation {pres_id} due to invalid GigaChat response")
                except Exception as del_err:
                    print(f"[PresentationGenerate] Failed to delete presentation {presentation.id}: {del_err}")

                return Response({"error": "GigaChat вернул невалидный JSON", "raw": raw}, status=400)

            presentation.data = parsed
            presentation.save()

            return Response({"id": presentation.id, "data": presentation.data})

        except Exception as e:
            traceback.print_exc()
            # При любой ошибке во время генерации — удаляем объект презентации,
            # чтобы не оставлять пустые/некорректные записи.
            try:
                pres_id = presentation.id
                presentation.delete()
                print(f"[PresentationGenerate] Deleted presentation {pres_id} due to exception")
            except Exception as del_err:
                print(f"[PresentationGenerate] Failed to delete presentation {presentation.id}: {del_err}")

            return Response({"error": "Не удалось сгенерировать презентацию", "details": str(e)}, status=400)

    @action(detail=True, methods=["post"])
    def save_data(self, request, pk=None):
        """
        Сохраняет data и генерирует PPTX.
        Уменьшает trial_generations только при успешной генерации.
        """
        presentation = self.get_object()
        user = request.user
        data = request.data.get("data")

        if not data:
            return Response({"error": "Нет data"}, status=400)

        # сохраняем структуру слайдов
        presentation.data = data
        image_prompt = presentation.image_prompt

        # подбираем картинки (до двух)
        image_urls = []
        if image_prompt:
            image_urls = search_image_urls(image_prompt, count=2)

        # генерируем pptx, если есть шаблон
        try:
            if presentation.template.pptx_file:
                pptx_io = fill_pptx_template(
                    presentation.template.pptx_file.path,
                    data,
                    image_urls=image_urls
                )
                presentation.pptx_file.save(
                    f"{presentation.title}.pptx",
                    ContentFile(pptx_io.read()),
                    save=True
                )

            # только после успешной генерации уменьшаем trial_generations
            if user.trial_generations > 0:
                user.trial_generations -= 1
                user.save()
            else:
                return Response({"error": "Закончились пробные генерации"}, status=403)

            presentation.save()

            return Response({
                "id": presentation.id,
                "pptx_file": presentation.pptx_file.url if presentation.pptx_file else None
            })

        except Exception as e:
            traceback.print_exc()
            return Response(
                {"error": "Ошибка при генерации PPTX", "details": str(e)},
                status=500
            )

    @action(detail=True, methods=["get"])
    def download(self, request, pk=None):
        pres = self.get_object()
        if not pres.pptx_file:
            raise Http404("Файл ещё не создан")
        return FileResponse(
            pres.pptx_file.open(),
            as_attachment=True,
            filename=f"{pres.title}.pptx"
        )
