from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.relations import PrimaryKeyRelatedField
from users.models import TodoUser
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    users = PrimaryKeyRelatedField(queryset=TodoUser.objects.select_related(), many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(queryset=TodoUser.objects.select_related())
    is_active = serializers.BooleanField(read_only=True)
    project = PrimaryKeyRelatedField(queryset=Project.objects.select_related())

    class Meta:
        model = ToDo
        fields = '__all__'