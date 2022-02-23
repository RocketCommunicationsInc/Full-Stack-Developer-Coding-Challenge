from .models import Contact, Alert
from rest_framework import serializers

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = (
            '_id',
            'contact_id',
            'contact_status',
            'contact_name',
            'contact_ground',
            'contact_satellite',
            'contact_equipment',
            'contact_state',
            'contact_step',
            'contact_detail',
            'contact_begin_timestamp',
            'contact_end_timestamp',
            'contact_latitude',
            'contact_longitude',
            'contact_azimuth',
            'contact_elevation',
            'contact_resolution',
            'contact_resolution_status'
        )

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = (
            '_id',
            'error_id',
            'error_severity',
            'error_category',
            'error_message',
            'long_message',
            'error_time',
            'selected',
            'new',
            'expanded'
        )
