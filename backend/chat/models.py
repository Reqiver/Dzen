from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()

class ChatMessage(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    # room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, default=DEFAULT_STATUS_ID)
    date = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
