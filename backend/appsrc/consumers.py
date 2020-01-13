from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import ChatMessage, DzenUser


class ChatConsumer(WebsocketConsumer):

    def fetch_message(self, data):
        messages = ChatMessage.objects.order_by('-date')
        content = {
            "messages": self.messages_to_json(messages)
        }
        self.send_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'author': message.author.username,
            'message': message.message,
            'date': message.date
        }

    def new_message(self, data):
        author = data['from']
        auth_user = DzenUser.objects.filter(username=author)
        message = Message.objects.create(
            author=auth_user,
            content=data['message'])
        content = {
            'commad': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_messge(content)

    commands = {
        "fetch_message": fetch_message,
        "new_message": new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        async_to_sync self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self/commands[data['command']](self, data)

    def send_chat_messge(self, message):

        # Send message to room group
        async_to_sync self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
