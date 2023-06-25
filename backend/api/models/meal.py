from django.db import models
from ckeditor.fields import RichTextField
from ..utils.image_utils import generate_unique_filename

MEAL_TYPE_CHOICES = (
  ('breakfast', 'Breakfast'),
  ('lunch', 'Lunch'),
  ('dinner', 'Dinner'),
  ('snack', 'Snack'),
  ('dessert', 'Dessert'),
  ('smoothie', 'Smoothie'),
  ('drink', 'Drink'),
)

class Meal(models.Model):
  title = models.CharField(max_length=50)
  image = models.ImageField(upload_to=f'meals/{generate_unique_filename}', default='default.png')
  recipe = RichTextField()
  meal_type = models.CharField(max_length=50, choices=MEAL_TYPE_CHOICES)
  tags = models.ManyToManyField('MealTag')
  timestamp = models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
    return str(self.title)


class MealTag(models.Model):
  title = models.CharField(max_length=15)

  def __str__(self) -> str:
    return str(self.title)
