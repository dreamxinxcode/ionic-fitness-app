from django.contrib import admin
from ..models.exercise import Exercise, ExerciseFavorites

admin.site.register(Exercise)
admin.site.register(ExerciseFavorites)