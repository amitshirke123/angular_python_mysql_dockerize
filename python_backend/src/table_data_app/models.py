from django.db import models

# Create your models here.
class TableData(models.Model):
    city = models.CharField(max_length=70, blank=False, default='')
    start_date = models.DateField(blank=False)
    end_date = models.DateField(blank=False)
    price = models.TextField(blank=False, default='')
    status = models.TextField(max_length=70, blank=False, default='')
    color = models.TextField(max_length=70, blank=False, default='')
