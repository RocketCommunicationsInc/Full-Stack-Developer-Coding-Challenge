import uuid
import random
import string
from django.db import models

# Create your models here.
class Contact(models.Model):
    _id = models.CharField(primary_key=True, max_length=200)
    contact_id = models.CharField(max_length=200)
    contact_status = models.CharField(max_length=200)
    contact_name = models.IntegerField(default=30, null=True, blank=True)
    contact_ground = models.CharField(max_length=200)
    contact_satellite = models.CharField(max_length=200)
    contact_equipment = models.CharField(max_length=200)
    contact_state = models.CharField(max_length=200)
    contact_step = models.CharField(max_length=200)
    contact_detail = models.CharField(max_length=200)
    contact_begin_timestamp = models.DateTimeField(auto_now_add=True)
    contact_end_timestamp = models.DateTimeField(auto_now_add=True)
    contact_latitude = models.CharField(max_length=200)
    contact_longitude = models.CharField(max_length=200)
    contact_azimuth = models.FloatField()
    contact_elevation = models.FloatField()
    contact_resolution = models.CharField(max_length=200)
    contact_resolution_status = models.CharField(max_length=200)
    def __str__(self):
        return self._id

class Alert(models.Model):
    _id = models.AutoField(
      auto_created=True,
      primary_key=True,
      serialize=False,
      verbose_name='_id'
    )
    error_id = models.CharField(max_length=200)
    error_severity = models.CharField(max_length=200)
    error_category = models.CharField(max_length=200)
    error_message = models.CharField(max_length=200)
    long_message = models.CharField(max_length=200)
    error_time = models.DateTimeField(auto_now_add=True)
    selected = models.BooleanField(default=False)
    new = models.BooleanField(default=False)
    expanded = models.BooleanField(default=False)
    def __str__(self):
        return self._id