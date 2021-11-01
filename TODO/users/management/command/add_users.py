from django.core.management import BaseCommand
from users.models import TodoUser
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Количество создаваемых пользователей')
        parser.add_argument('-a', '--admin', action='store_true', help='Создание учетной записи администратора')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        admin = kwargs['admin']

        for i in range(total):
            if admin:
                TodoUser.objects.create_superuser(username=get_random_string(), email='', password='123')
            else:
                TodoUser.objects.create_user(username=get_random_string(), email='', password='123')
