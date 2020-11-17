from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rocket.models import Contact, Alert
from rocket.serializers import ContactSerializer, AlertSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# Create your views here.

class AlertViewSet(viewsets.ModelViewSet):
	queryset = Alert.objects.all().order_by('-created')
	serializer_class = AlertSerializer
	permission_classes = [permissions.IsAuthenticated]
	filter_backends = [filters.OrderingFilter]
	ordering_fields = ['created', 'error_time', 'error_severity', 'error_category']

class ContactViewSet(viewsets.ModelViewSet):
	queryset = Contact.objects.all().order_by('-created')
	serializer_class = ContactSerializer
	permission_classes = [permissions.IsAuthenticated]
	filter_backends = [filters.OrderingFilter]
	ordering_fields = ['created', 'contact_begin_timestamp', 'contact_end_timestamp', 'contact_status', 'contact_state', 'contact_ground', 'contact_name']

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
	serializer = UserSerializer(request.user)
	permission_classes = [permissions.IsAuthenticated]
	return Response(serializer.data)
