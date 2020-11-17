from django.db import models
from django.db.models import Count

# Create your models here.
class Contact(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	_id = models.CharField(max_length=191, blank=False)
	contact_id = models.UUIDField()
	contact_status = models.CharField(max_length=191)
	contact_name = models.IntegerField()
	contact_ground = models.CharField(max_length=191)
	contact_satellite = models.CharField(max_length=191)
	contact_equipment = models.CharField(max_length=191)
	contact_state = models.CharField(max_length=191)
	contact_step = models.CharField(max_length=191)
	contact_detail = models.TextField()
	contact_begin_timestamp = models.IntegerField()
	contact_end_timestamp = models.IntegerField()
	contact_latitude = models.FloatField()
	contact_longitude = models.FloatField()
	contact_azimuth = models.FloatField()
	contact_elevation = models.FloatField()
	contact_resolution = models.CharField(max_length=191)
	contact_resolution_status = models.CharField(max_length=191)
	class Meta:
		ordering = ['created']
	def get_state_counts() :
		return Contact.objects.all().values('contact_state').annotate(total=Count('contact_state'))

class Alert(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	error_id = models.UUIDField()
	error_severity = models.CharField(max_length=191)
	error_category = models.CharField(max_length=191)
	error_message = models.CharField(max_length=191)
	long_message = models.TextField()
	error_time = models.IntegerField()
	selected = models.BooleanField()
	new = models.BooleanField()
	expanded = models.BooleanField()
	class Meta:
		ordering = ['created']
