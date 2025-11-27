from django.contrib import admin
from django.utils.html import format_html
from .models import PresentationTemplate, TemplateImage, UserPresentation

class TemplateImageInline(admin.TabularInline):
    model = TemplateImage
    extra = 1

@admin.register(PresentationTemplate)
class PresentationTemplateAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "slides_count", "images_count", "pptx_file")
    inlines = [TemplateImageInline]

@admin.register(UserPresentation)
class UserPresentationAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "user", "template", "created_at", "pptx_file", "download_link")
    search_fields = ("title", "user__email")

    def download_link(self, obj):
        if obj.pptx_file:
            return format_html(
                '<a href="{}" target="_blank">Скачать PPTX</a>',
                obj.pptx_file.url
            )
        return "-"
    
    download_link.short_description = "Скачать презентацию"
