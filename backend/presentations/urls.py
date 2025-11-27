from django.urls import path, include # type: ignore
from rest_framework.routers import DefaultRouter # type: ignore
from .views import PresentationTemplateViewSet, UserPresentationViewSet

router = DefaultRouter()
router.register(r'templates', PresentationTemplateViewSet, basename='template')
router.register(r'user-presentations', UserPresentationViewSet, basename='user-presentation')

urlpatterns = [
    path('', include(router.urls)),
]
