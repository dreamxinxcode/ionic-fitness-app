from django.db import models
from users.views import CustomUser


class Workout(models.Model):
  uuid = models.UUIDField()
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  timestamp = models.DateTimeField()

  @property
  def sets(self):
      return self.set_set.all()
  
  def __str__(self) -> str:
    return str(self.uuid)

