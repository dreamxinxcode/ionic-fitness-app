from django.db import models


MEAL_TYPE_CHOICES = (
  ('BREAKFAST', 'Breakfast'),
  ('LUNCH', 'Lunch'),
  ('DINNER', 'Dinner'),
  ('SNACK', 'Snack'),
  ('DESSERT', 'Dessert'),
  ('Smoothie', 'Smoothie'),
  ('DRINK', 'Drink'),
)

class Meal(models.Model):
  title = models.CharField(max_length=50)
  image = models.ImageField(default='default.png', upload_to='meals')
  recipe = models.TextField()
  meal_type = models.CharField(max_length=50, choices=MEAL_TYPE_CHOICES)
  tags = models.ManyToManyField('Tag')

  def __str__(self):
    return str(self.title)


class Tag(models.Model):
  title = models.CharField(max_length=15)

  def __str__(self):
    return str(self.title)
