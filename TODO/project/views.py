from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectPageNumberPagination(PageNumberPagination):
    default_limit = 2


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPageNumberPagination

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        if name:
            self.queryset = self.queryset.filter(name__contains=name)
        return self.queryset


class ToDoPageNumberPagination(PageNumberPagination):
    page_size = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPageNumberPagination

    def get_queryset(self):
        project = self.request.query_params.get('project', '')
        if project:
            self.queryset = self.queryset.filter(project__name=project)
        return self.queryset

    def destroy(self, request, pk=None):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
