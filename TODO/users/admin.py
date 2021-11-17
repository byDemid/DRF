from django.contrib import admin

# Register your models here.

from .models import TodoUser


@admin.register(TodoUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'is_staff', 'is_superuser']