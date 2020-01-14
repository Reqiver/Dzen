from django.urls import include, path
from .views import index, room


urlpatterns = [
        path('chat', index, name='index'),
        path('chat/<str:room_name>/', room, name='room'),
]
