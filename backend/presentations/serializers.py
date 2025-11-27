from rest_framework import serializers
from .models import PresentationTemplate, TemplateImage, UserPresentation

class TemplateImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = TemplateImage
        fields = ["id", "image"]

    def get_image(self, obj):
        request = self.context.get('request')
        if request:
            # формируем абсолютный URL, который отдаёт Nginx
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class PresentationTemplateSerializer(serializers.ModelSerializer):
    images = TemplateImageSerializer(many=True, read_only=True)

    class Meta:
        model = PresentationTemplate
        fields = [
            "id",
            "title",
            "slides_count",
            "images_count",
            "description",
            "images",
        ]


class UserPresentationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPresentation
        fields = ["id", "template", "title"]


class UserPresentationSerializer(serializers.ModelSerializer):
    data = serializers.JSONField()
    pptx_file = serializers.FileField(read_only=True)

    class Meta:
        model = UserPresentation
        fields = ["id", "data", "title", "pptx_file", "created_at"]
