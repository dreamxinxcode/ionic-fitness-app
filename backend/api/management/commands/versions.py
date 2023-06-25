from django.core.management.base import BaseCommand
from api.models.version import Version

versions = [
    { 'name': 'Bench Press' },
]

class Command(BaseCommand):
    help = 'Create Version objects in DB.'

    def clear(self):
        print('Clearing all Version objects...')
        Version.objects.all().delete()
        print('Done')

    def handle(self, *args, **kwargs):
        self.clear()

        for version in versions:
            print(f'Creating exercise object: {exercise}...')
            Version.objects.create(**version)
        
        print('Done')