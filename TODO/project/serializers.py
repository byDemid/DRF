from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'