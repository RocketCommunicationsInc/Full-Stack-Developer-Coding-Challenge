from rest_framework import serializers
from .models import alerts
from rest_framework.permissions import IsAuthenticated

class Alerts(serializers.ModelSerializer):
    class Meta:
        model = alerts
        fields = ('__all__')