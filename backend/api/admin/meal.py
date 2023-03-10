from django.contrib import admin
from ..models.meal import Meal, MealTag


admin.site.register(Meal)
admin.site.register(MealTag)