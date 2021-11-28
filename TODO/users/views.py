from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import TodoUser
from .serializers import UserModelSerializer, UserModelSerializerOnlyUsername
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import mixins


# class UserModelViewSet(ModelViewSet):
#     queryset = TodoUser.objects.all()
#     serializer_class = UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                               mixins.UpdateModelMixin, GenericViewSet):
    queryset = TodoUser.objects.all()
    # serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerOnlyUsername
        return UserModelSerializer
