from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from rest_framework.generics import get_object_or_404


class ProjectPageNumberPagination(PageNumberPagination):
    default_limit = 2


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectPageNumberPagination

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
    # pagination_class = ToDoPageNumberPagination

    # def get_queryset(self):
    #     project = self.request.query_params.get('project', '')
    #     if project:
    #         self.queryset = self.queryset.filter(project__name=project)
    #     return self.queryset

    def destroy(self, request, pk=None):
        todo = get_object_or_404(ToDo, pk=pk)
        serializer = ToDoModelSerializer(todo,
                                         data={"user": todo.user.pk, "project": todo.project.pk, "is_active": "false"})
        serializer.is_valid(raise_exception=True)
        todo.is_active = False
        todo.save()
        # return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.data)
