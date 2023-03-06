from django.db import models
from users.views import CustomUser


class Workout(models.Model):
  uuid = models.UUIDField()
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  workout_data = models.JSONField()

  def __str__(self):
    return str(self.uuid)
