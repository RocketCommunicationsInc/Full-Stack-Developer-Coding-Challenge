from rest_framework import serializers
from .models import contact
from rest_framework.permissions import IsAuthenticated



class Contacts(serializers.ModelSerializer):
    class Meta:
        model = contact
        fields = ('__all__')


