from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import contact
from .serializers import Contacts
from rest_framework.permissions import IsAuthenticated


class ContactListView(ListAPIView):
    
    queryset = contact.objects.all()
    serializer_class = Contacts
    lookup_field = 'slug'



    