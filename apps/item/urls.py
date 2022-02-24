# backend/apps/item/urls.py
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ContactsListView, AlertsListView

urlpatterns = [
    path('item/contacts/', ContactsListView.as_view(), name="item_contacts"),
    path('item/alerts/', AlertsListView.as_view(), name='item_alerts')
]