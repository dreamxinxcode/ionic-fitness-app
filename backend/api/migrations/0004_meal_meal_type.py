# Generated by Django 4.1.6 on 2023-03-06 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_tag_meal'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='meal_type',
            field=models.CharField(choices=[('BREAKFAST', 'Breakfast'), ('LUNCH', 'Lunch'), ('DINNER', 'Dinner'), ('SNACK', 'Snack'), ('DESSERT', 'Dessert'), ('Smoothie', 'Smoothie'), ('DRINK', 'Drink')], default='BREAKFAST', max_length=50),
            preserve_default=False,
        ),
    ]
