from django.contrib import admin
from ..models.meal import Meal, Tag


admin.site.register(Meal)
admin.site.register(Tag)