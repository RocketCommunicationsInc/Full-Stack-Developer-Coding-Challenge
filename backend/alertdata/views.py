from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import alerts
from .serializers import Alerts
from rest_framework.filters import SearchFilter, OrderingFilter


class AlertsListView(ListAPIView):
    queryset = alerts.objects.all()
    serializer_class = Alerts
    lookup_field = 'slug'
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('errorcategory')