# backend/apps/authentication/urls.py
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, CustomUserCreateView, HelloWorldView, LogoutAndBlacklistRefreshTokenForUserView, CurrentUserView

urlpatterns = [
    path('user/register/', CustomUserCreateView.as_view(), name="create_user"),
    path('user/login/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('user/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('user/logout/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('user/auth/', CurrentUserView.as_view(), name="current_user")
]