from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/alert', views.AlertsListView.as_view() ),
    
]