from __future__ import unicode_literals
from django.contrib import admin

# Register your models here.
from appsrc.models import DzenUser as User
from appsrc.models import Roles as Role
from appsrc.models import Books as Book


admin.site.register(User)
admin.site.register(Role)
#admin.site.register(Book)

class BookAdmin(admin.ModelAdmin):
    """docstring for BookAdmin."""

    list_display = ('bookname', 'author', 'owner', 'status')
    list_filter = ('status', 'genre')

admin.site.register(Book, BookAdmin)
