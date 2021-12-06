from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import TodoUser
from .serializers import UserModelSerializer, UserModelSerializerOnlyUsername
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import mixins


# class UserModelViewSet(ModelViewSet):
#     queryset = TodoUser.objects.all()
#     serializer_class = UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = UserModelSerializerOnlyUsername
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [IsAuthenticated]

    # def get_serializer_class(self):
    #     if self.request.version == '0.2':
    #         return UserModelSerializerOnlyUsername
    #     return UserModelSerializer
