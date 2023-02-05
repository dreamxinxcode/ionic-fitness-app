from django.db import models

class Workout(models.Model):
  uuid = models.UUIDField()
  timestamp = models.DateTimeField(auto_now_add=True)
  workout_data = models.JSONField()

  def __str__(self):
    return str(self.uuid)
