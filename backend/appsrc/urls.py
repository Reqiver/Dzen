from django.urls import include, path

from .views.user_auth import (UserLogin, UserLogout, UserRegistration,
                              UserSocialLogin, UserSocialRegistration)
from .views.books import TopBooks


urlpatterns = [
    path('books/top', TopBooks.as_view(), name='top-books'),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/social/login', UserSocialLogin.as_view(), name='social_login'),
    path('user/social/register', UserSocialRegistration.as_view(), name='social_register'),
]
