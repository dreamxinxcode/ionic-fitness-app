from django.db import models
from users.models import CustomUser

class Block(models.Model):
    blocking_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='blocked_users')
    blocked_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='blocked_by_users')
    timestamp = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return f'{self.blocking_user} blocked {self.blocked_user}'
    
