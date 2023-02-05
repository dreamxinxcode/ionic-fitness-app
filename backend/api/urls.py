from django.urls import path
from .views import exercise, workout

urlpatterns = [
    path('exercises', exercise.get_all_exercises, name='get_all_exercises'),
    path('workouts', workout.get_all_workouts, name='get_all_workouts'),    
    path('workout', workout.add_new_workout, name='add_new_workout'),
]