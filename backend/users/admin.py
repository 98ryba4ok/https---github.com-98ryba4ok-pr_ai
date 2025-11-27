# backend/users/admin.py
from django.contrib import admin # type: ignore
from django.contrib.auth import get_user_model # type: ignore
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin # type: ignore

User = get_user_model()


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("email", "name", "is_active", "is_staff", "trial_generations")
    list_filter = ("is_active", "is_staff")
    search_fields = ("email", "name")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Персональные данные", {"fields": ("name", "trial_generations")}),
        ("Права доступа", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Даты", {"fields": ("last_login",)}),  
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "name", "password1", "password2", "is_active", "is_staff"),
            },
        ),
    )
