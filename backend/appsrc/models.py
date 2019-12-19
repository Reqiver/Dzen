from django.contrib.auth.models import AbstractUser
from django.db import models


DEFAULT_ROLE_ID = 1
DEFAULT_CATEGORIES_ID = 1
DEFAULT_RATE = 0
DEFAULT_COST = 0
DEFAULT_LAST_SEEN = 0
DEFAULT_STATUS_ID = 1
EMPTY_STRING = ""

class Roles(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Genres(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class UserStatuses(models.Model):
    name = models.CharField(max_length=40)

class DzenUser(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']
    username = models.CharField(max_length=20, unique=True)
    status = models.ForeignKey(UserStatuses, default=DEFAULT_STATUS_ID, on_delete=models.CASCADE)
    role = models.ForeignKey(Roles, default=DEFAULT_ROLE_ID, related_name='owner',on_delete=models.SET_DEFAULT)
    first_name = models.CharField(max_length=20, blank=True, default=EMPTY_STRING)
    last_name = models.CharField(max_length=20, blank=True, default=EMPTY_STRING)
    location = models.TextField(blank=True, default=EMPTY_STRING)
    password = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    i_like = models.TextField(blank=True, default=EMPTY_STRING)
    birth_date = models.IntegerField(blank=True, default=0)
    phone_number = models.CharField(max_length=13, blank=True, default=EMPTY_STRING)
    avatar_url = models.CharField(max_length=255, blank=True, default=EMPTY_STRING)
    is_active = models.BooleanField(default=False, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')
    cover_url = models.TextField(blank=True, default=EMPTY_STRING)
    last_seen = models.IntegerField(blank=False, default=DEFAULT_LAST_SEEN)

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)

# class Authors(models.Model):
#     first_name = models.CharField(max_length=20, blank=True, default=EMPTY_STRING)
#     last_name = models.CharField(max_length=20, blank=True, default=EMPTY_STRING)
#     country = models.TextField(blank=True, default=EMPTY_STRING)
#     birth_date = models.IntegerField(blank=True, default=1)
#     photo_url = models.TextField(blank=True, default=EMPTY_STRING)

class Books(models.Model):
    bookname = models.CharField(max_length=150)
    # author = models.ForeignKey(Authors, on_delete=models.CASCADE)
    author = models.CharField(max_length=100, default=EMPTY_STRING)
    owner = models.ForeignKey(DzenUser, on_delete=models.CASCADE, default=DEFAULT_ROLE_ID)
    status = models.CharField(max_length=50)
    languge = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    date = models.IntegerField(blank=False)
    date_publ = models.CharField(max_length=50, default=EMPTY_STRING)
    rate = models.IntegerField(default=DEFAULT_RATE)
    cost = models.IntegerField(default=DEFAULT_COST)
    genre = models.ForeignKey(Genres, default=DEFAULT_CATEGORIES_ID, on_delete=models.SET_DEFAULT)
    cover_url = models.CharField(max_length=100)

    def __str__(self):
        return self.bookname

class Events(models.Model):
    genre = models.ForeignKey(Genres, on_delete=models.SET_DEFAULT, default=DEFAULT_CATEGORIES_ID)
    name = models.CharField(max_length=60)
    description = models.TextField(blank=False)
    date = models.IntegerField(blank=False)
    location = models.TextField(blank=False)
    cover_url = models.CharField(max_length=80, blank=True, default=EMPTY_STRING)

class EventsSubscribers(models.Model):
    participant = models.ForeignKey(DzenUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Events, on_delete=models.CASCADE, related_name="subscribed_event")
    completed = models.BooleanField(default=False)

class BookComments(models.Model):
    author = models.ForeignKey(DzenUser, related_name='user_details', on_delete=models.CASCADE)
    book = models.ForeignKey(Books, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)

class EventsComments(models.Model):
    author = models.ForeignKey(DzenUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)
