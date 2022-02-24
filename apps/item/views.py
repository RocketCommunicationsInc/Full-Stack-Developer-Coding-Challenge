# backend/apps/item/contact/views.py
# backend/apps/item/alert/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Contact, Alert
from .serializers import ContactSerializer, AlertSerializer

# Create your views here.
class ContactsListView(APIView):

    def get(self, request):
        contacts = Contact.objects.all().order_by('_id')
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AlertsListView(APIView):

    def get(self, request):
        alerts = Alert.objects.all().order_by('_id')
        serializer = AlertSerializer(alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)