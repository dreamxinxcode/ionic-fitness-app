from django.core.management.base import BaseCommand
from api.models.block import Block

blocks = [

]

class Command(BaseCommand):
    help = 'Create user block objects in DB.'

    def clear(self):
        print('Clearing all Block objects...')
        Block.objects.all().delete()
        print('Done')

    def handle(self, *args, **kwargs):
        pass