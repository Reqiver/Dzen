from django.contrib.auth import authenticate, login
from datetime import datetime
from rest_framework import serializers

from google.oauth2 import credentials
from djoser.compat import get_user_email
from facepy import GraphAPI
from djoser.conf import settings

from ..generate_password import generate_password
from ..models import DzenUser


class RegistrationSerializer(serializers.ModelSerializer):
    """Takes data from registration request and create new user.

    Converts it to JSON format for transmission via the API.

    """

    class Meta:
        model = DzenUser
        fields = ('password', 'email', 'username')

    def create(self, validated_data):
        user = DzenUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'])
        user.set_password(validated_data['password'])

        return user


class SocialRegistrationSerializer(serializers.ModelSerializer):
    """Takes data from registration via social networks request and create new user.

    Converts it to JSON format for transmission via the API.

    """

    class Meta:
        model = DzenUser
        fields = ('email', 'first_name', 'last_name', 'username')

    def create(self, validated_data):
        user = DzenUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'])
        user.set_password(generate_password())

        return user


class LoginSerializer(serializers.Serializer):
    """Validate request data for user login

    Converts it to JSON format for transmission via the API.

    """

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email=data['email']
        password=data['password']
        user = DzenUser.objects.get(email=email)
        if email and password:
            if user.check_password(password):
                user = authenticate(email=email, password=password)
                if user and user.is_active:
                    user.last_login = datetime.now()
                    user.save(update_fields=['last_login'])
                    return user
        return False


class SocialLoginSerializer(serializers.Serializer):
    """Validate request data and token from network for user login via social networks

    Converts it to JSON format for transmission via the API.

    """

    email = serializers.EmailField()
    access_token = serializers.CharField(max_length=None)
    network_name = serializers.CharField()

    def validate(self, data):
        user = DzenUser.objects.get(email=data['email'])
        email=data['email']
        access_token=data['access_token']
        network_name=data['network_name']
        if network_name == 'Facebook':
            graph = GraphAPI(access_token)
            try:
                if graph.get('me'):
                    if user and user.is_active:
                        return user
            except GraphAPI.OAuthError:
                return False
        elif network_name == 'Google':
            credential = credentials.Credentials(access_token)
            if user and user.is_active:
                return user
            return False
