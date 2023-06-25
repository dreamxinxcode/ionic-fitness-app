from django.core.management.base import BaseCommand
from api.models.exercise import Exercise

exercises = [
    {'name': 'Bench Press'},
    {'name': 'Squat'},
    {'name': 'Deadlift'},
    {'name': 'Overhead Press'},
    {'name': 'Barbell Row'},
    {'name': 'Barbell Curl'},
    {'name': 'Dumbbell Curl'},
    {'name': 'Tricep Pushdown'},
    {'name': 'Leg Press'},
    {'name': 'Pull-ups'},
    {'name': 'Lunges'},
]

class Command(BaseCommand):
    help = 'Create exercise objects in DB.'

    def clear(self):
        print('Clearing all Exercise objects...')
        Exercise.objects.all().delete()
        print('Done')

    def handle(self, *args, **kwargs):
        self.clear()

        for exercise in exercises:
            print(f'Creating exercise object: {exercise}...')
            Exercise.objects.create(**exercise)
        
        print('Done')