from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import TodoUser


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TodoUser
        fields = ['username', 'first_name', 'last_name', 'email']


class UserModelSerializerOnlyUsername(ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ['username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff']