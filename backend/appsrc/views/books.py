from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.paginator import Paginator
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import Books, DzenUser
from ..serializers.books_serializer import TopBooksSerializator


NUMBER_OF_TOP = 12
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class TopBooks(APIView):
    """Takes data from TopBooksSerializator for view top rate books"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='top_books')
    def get(self, request):
        """First check request data in cache, then pull data from db"""
        books = Books.objects.order_by('-rate')[:NUMBER_OF_TOP]
        serializer = TopBooksSerializator(books, many=True)
        return Response(serializer.data)
