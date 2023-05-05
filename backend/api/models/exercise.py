from django.db import models
from users.models import CustomUser

class Exercise(models.Model):
  name = models.CharField(max_length=50, unique=True)
  image = models.ImageField(blank=True, null=True)
  user = models.ForeignKey(CustomUser, blank=True, null=True, on_delete=models.CASCADE)

  def __str__(self):
      return self.name
    
    
class ExerciseFavorites(models.Model):
   user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
   exercise = models.ManyToManyField(Exercise)

   def __str__(self):
      return self.user.username
   
   class Meta:
      verbose_name_plural = 'Exercise Favorites'