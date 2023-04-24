from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager

UNITS = (
    ('metric', 'Metric'),
    ('imperial', 'Imperial'),
)

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(max_length=20)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    ip = models.GenericIPAddressField(blank=True, null=True)
    is_banned = models.BooleanField(default=False)
    
    # Privacy settings
    show_first_name = models.BooleanField(default=True)
    show_last_name = models.BooleanField(default=True)
    show_age = models.BooleanField(default=True)
    show_weight = models.BooleanField(default=True)
    show_height = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    workout_count = models.IntegerField(default=0)
    avatar = models.ImageField(default='/media/avatar.jpg', upload_to='avatars')
    bio = models.TextField(blank=True, null=True)
    units_height = models.CharField(choices=UNITS, default='imperial', max_length=8)
    units_weight = models.CharField(choices=UNITS, default='imperial', max_length=8)

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'
    

class Ban(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    reason = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.ip} - {self.reason}'
    
    def save(self, *args, **kwargs):
        self.user.is_banned = True;
        super().save(*args, **kwargs) 