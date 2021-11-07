from django.db import models
from users.models import TodoUser


class Project(models.Model):
    users = models.ManyToManyField(TodoUser)
    name = models.CharField(max_length=100, verbose_name='Название проекта', unique=True)
    repo_url = models.URLField(verbose_name='Ссылка на репозиторий проекта', blank=True)

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(TodoUser, on_delete=models.CASCADE)
    description = models.TextField(verbose_name='Заметка')
    create = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    update = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    is_active = models.BooleanField(default=True)