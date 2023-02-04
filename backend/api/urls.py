from django.urls import path, include
from .views import exercise, workouts

urlpatterns = [
    path('exercises', exercise.get_all_exercises, name='get_all_exercises')
]