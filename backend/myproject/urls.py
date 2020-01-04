from django.contrib import admin
from django.urls import include, path
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    url('api/', include('appsrc.urls')),
    url('api/auth/', include('djoser.urls')),
    url('api/auth/', include('djoser.urls.authtoken')),
    url('api/auth/', include('djoser.urls.jwt')),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
