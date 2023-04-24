# Generated by Django 4.1.6 on 2023-03-11 19:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0016_exercise_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Block',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('blocked_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocked_by_users', to=settings.AUTH_USER_MODEL)),
                ('blocking_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocked_users', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
