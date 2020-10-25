# Generated by Django 3.1.2 on 2020-10-19 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TableData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(default='', max_length=70)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('price', models.TextField(default='')),
                ('status', models.TextField(default='', max_length=70)),
                ('color', models.TextField(default='', max_length=70)),
            ],
        ),
    ]
