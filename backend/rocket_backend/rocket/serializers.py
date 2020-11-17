from rest_framework import serializers
from rocket.models import Contact, Alert
from django.contrib.auth.models import User


class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact
		fields = ['id', '_id', 'contact_id', 'contact_status', 'contact_name', 'contact_ground', 'contact_satellite', 'contact_equipment', 'contact_state', 'contact_step', 'contact_detail', 'contact_begin_timestamp', 'contact_end_timestamp', 'contact_latitude', 'contact_longitude', 'contact_azimuth', 'contact_elevation', 'contact_resolution', 'contact_resolution_status']

class AlertSerializer(serializers.ModelSerializer):
	class Meta:
		model = Alert
		fields = ['id', 'created', 'error_id', 'error_severity', 'error_category', 'error_message', 'long_message', 'error_time', 'selected', 'new', 'expanded']

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'email']
