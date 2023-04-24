from django.db import models


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
  image = models.ImageField(default='default.png', upload_to='meals')
  recipe = models.TextField()
  meal_type = models.CharField(max_length=50, choices=MEAL_TYPE_CHOICES)
  tags = models.ManyToManyField('MealTag')

  def __str__(self):
    return str(self.title)


class MealTag(models.Model):
  title = models.CharField(max_length=15)

  def __str__(self):
    return str(self.title)
