from django.core.management.base import BaseCommand
from api.models.meal import MealTag

tags = [
    { 'title': 'Dinner' },
    { 'title': 'Lunch' },
    { 'title': 'Breakfast' },
    { 'title': 'Snacks' },
    { 'title': 'Dessert' },
    { 'title': 'Salad' },
    { 'title': 'Smoothie' },
    { 'title': 'Keto' },
    { 'title': 'Salad' },
    { 'title': 'Seafood' },
]

class Command(BaseCommand):
    help = 'Create meal tag objects in DB.'

    def clear(self):
        print('Clearing all MealTag objects...')
        MealTag.objects.all().delete()
        print('Done')

    def handle(self, *args, **kwargs):
        self.clear()

        for tag in tags:
            print(f'Creating meal tag object: {tag}...')
            MealTag.objects.create(**tag)
        
        print('Done')