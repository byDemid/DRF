from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from users.models import TodoUser
from .views import ProjectModelViewSet
from .models import Project

from rest_framework.authtoken.models import Token

# Create your tests here.


class TestProjectViewSetTestCase(TestCase):
    url = '/api/projects/'

    def setUp(self):
        pass

    def test_get_list_quest(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_quest(self):
        project_data = {'name': 'Project', 'repo_url': 'Repo'}
        factory = APIRequestFactory()
        request = factory.post(self.url, project_data, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestProjectModelViewSetAPIClient(TestCase):
    url = '/api/projects/'

    def setUp(self):
        pass

    def test_get_list_quest(self):
        client = APIClient()
        response = client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_list_admin(self):
        client = APIClient()
        admin = TodoUser.objects.create_superuser(
            username='test001', email='', password='Qwert12345')
        client.force_authenticate(admin)
        response = client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_guest(self):
        client = APIClient()
        author = TodoUser.objects.create(first_name='Александр', last_name='Пушкин')
        response = client.put(f'{self.url}{author.id}/',
                              {'first_name': 'Test9', 'last_name': 'Test9'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestProjectModelViewSetAPITestCase(APITestCase):
    url = '/api/projects/'
    def setUp(self):
        self.super_user = get_user_model().objects.create_superuser(
            username='test009', email='test009@test.com', password='Qwert12345'
        )
        self.user = get_user_model().objects.create_user(
            username='test008', email='test008@test.com', password='Qwert12345'
        )
        self.project = {'users': ['http://127.0.0.1:8000/api/users/1/', 'http://127.0.0.1:8000/api/users/2/'],
                        'name': 'test',
                        'repo_url': 'http'}

    def test_get_list_quest(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_admin(self):
        self.client.force_login(self.super_user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_quest(self):
        response = self.client.post(self.url, self.project)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    # def test_edit_mixer(self):
    #     bio = mixer.blend(Project)
    #
    #     self.client.login(username='admin', password='admin_12345678')
    #     response = self.client.put(f'{self.url}',
    #                           {'repo_url': bio.repo_url})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

