from django.core.management.base import BaseCommand
from api.models.meal import Meal
import datetime

meals = [
    {
        'title': 'Garden Salad',
        'image': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=384&q=80',
        'recipe': 'Chop chop',
        'meal_type': 'Salad',
        'tags': [
            'Salad',
            'Low-carb'
        ],
    }
]

class Command(BaseCommand):
    help = 'Create meal tag objects in DB.'

    def clear(self):
        print('Clearing all Meal objects...')
        Meal.objects.all().delete()
        print('Done')

    def handle(self, *args, **kwargs):
        self.clear()

        for meal in meals:
            print(f'Creating meal object: {meal}...')
            Meal.objects.create(**meal)
        
        print('Done')