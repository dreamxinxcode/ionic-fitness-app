from django.db import models

class Workout(models.Model):
  uuid = models.UUIDField()
  workout_data = models.JSONField()

  def __str__(self):
    return str(self.uuid)
