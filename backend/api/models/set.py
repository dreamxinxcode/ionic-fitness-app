from django.db import models
from users.models import CustomUser
from .workout import Workout
from .exercise import Exercise


class Set(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
  exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)  # Updated field definition
  weight = models.IntegerField()
  reps = models.IntegerField()
  timestamp = models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
      return str(self.pk)