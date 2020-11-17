from django.urls import path
from . import views

urlpatterns = [
    path('dashboard', views.ContactListView.as_view() ),
    
    
]