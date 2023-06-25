from django.db import models
from users.models import CustomUser
from ..utils.image_utils import generate_unique_filename


MUSCLE_CHOICES_BASIC = (
    ('Chest', 'Chest'),
    ('Back', 'Back'),
    ('Legs', 'Legs'),
    ('Shoulders', 'Shoulders'),
    ('Arms', 'Arms'),
    ('Abs', 'Abs'),
)

MUSCLE_CHOICES = (
    ('Abdominals', 'Abdominals'),
    ('Abductors', 'Abductors'),
    ('Back', 'Back'),
    ('Biceps', 'Biceps'),
    ('Calves', 'Calves'),
    ('Chest', 'Chest'),
    ('Deltoids', 'Deltoids'),
    ('Erector Spinae', 'Erector Spinae'),
    ('Forearms', 'Forearms'),
    ('Gluteus Medius', 'Gluteus Medius'),
    ('Gluteus Minimus', 'Gluteus Minimus'),
    ('Glutes', 'Glutes'),
    ('Hamstrings', 'Hamstrings'),
    ('Hip Flexors', 'Hip Flexors'),
    ('Quadriceps', 'Quadriceps'),
    ('Rhomboids', 'Rhomboids'),
    ('Rotator Cuff', 'Rotator Cuff'),
    ('Shoulders', 'Shoulders'),
    ('Trapezius', 'Trapezius'),
    ('Triceps', 'Triceps'),
)

class Exercise(models.Model):
  name = models.CharField(max_length=50, unique=True)
  muscle_group = models.CharField(choices=MUSCLE_CHOICES_BASIC, max_length=50)
  image = models.ImageField(upload_to=generate_unique_filename, blank=True, null=True)
  user = models.ForeignKey(CustomUser, blank=True, null=True, on_delete=models.CASCADE)

  def __str__(self) -> str:
      return self.name
    
    
class ExerciseFavorites(models.Model):
   user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
   exercise = models.ManyToManyField(Exercise)

   def __str__(self) -> str:
      return self.user.username
   
   class Meta:
      verbose_name_plural = 'Exercise Favorites'