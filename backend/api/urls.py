from django.urls import path
from .views import exercise, workouts

urlpatterns = [
    path('exercises', exercise.get_all_exercises, name='get_all_exercises'),
    path('workout', workouts.add_new_workout, name='add_new_workout'),
]