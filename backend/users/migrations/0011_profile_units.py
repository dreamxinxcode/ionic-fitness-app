# Generated by Django 4.1.6 on 2023-04-20 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_ban_expiry_date_alter_profile_bio_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='units',
            field=models.CharField(choices=[('lbs', 'lbs'), ('kg', 'kg')], default='lbs', max_length=3),
        ),
    ]
