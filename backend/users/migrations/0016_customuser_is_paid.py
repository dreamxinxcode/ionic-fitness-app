# Generated by Django 4.1.6 on 2023-04-29 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_alter_profile_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
    ]
