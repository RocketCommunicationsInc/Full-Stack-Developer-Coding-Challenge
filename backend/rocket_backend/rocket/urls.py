from django.urls import path
from rocket import views

urlpatterns = [
	path('alerts/', views.alert_list),
	path('alerts/<int:pk>/', views.alert_detail)
]
