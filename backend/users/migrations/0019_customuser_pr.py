# Generated by Django 4.1.6 on 2023-05-01 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_alter_profile_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='pr',
            field=models.JSONField(default={}),
            preserve_default=False,
        ),
    ]
