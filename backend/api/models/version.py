from django.db import models


class Version(models.Model):
  OS_CHOICES = (
    ('android', 'android'),
    ('ios', 'ios')
  )

  os = models.CharField(choices=OS_CHOICES, max_length=10)
  version = models.CharField(max_length=10)

  def __str__(self):
    return f'{self.os}-{self.version}'
