from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include('contactdata.urls')),
    path('', include('alertdata.urls')),
    path('admin/', admin.site.urls)
    
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
