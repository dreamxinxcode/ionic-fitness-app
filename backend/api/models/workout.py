from django.db import models

class Workout(models.Model):
  timestamp = models.DateTimeField(auto_now_add=True)
