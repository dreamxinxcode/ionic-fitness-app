# Generated by Django 4.1.6 on 2023-03-12 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_profile_city_profile_country_profile_workout_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='show_age',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='show_first_name',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='show_height',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='show_last_name',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='show_weight',
            field=models.BooleanField(default=True),
        ),
    ]
