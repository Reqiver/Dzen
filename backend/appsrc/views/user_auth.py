from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token

from djoser.compat import get_user_email
from djoser.conf import settings

from ..serializers.user_auth_serializer import (RegistrationSerializer,
                                                LoginSerializer,
                                                SocialRegistrationSerializer,
                                                SocialLoginSerializer)
from ..models import DzenUser


class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        data_request=request.data
        username = data_request.get('username')
        user = YouYodaUser.objects.filter(username=username)
        if user:
            msg = "You can not use this email. Try another or login."
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)

        serializer = RegistrationSerializer(data=data_request)
        if serializer.is_valid():
            user = serializer.save()
            context = {"user": user}
            to = [get_user_email(user)]
            if settings.SEND_ACTIVATION_EMAIL:
                settings.EMAIL.activation(self.request, context).send(to)
            elif settings.SEND_CONFIRMATION_EMAIL:
                settings.EMAIL.confirmation(self.request, context).send(to)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSocialRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        data_request=request.data
        serializer = SocialRegistrationSerializer(data=data_request)
        if serializer.is_valid():
            user = serializer.save()
            context = {"user": user}
            to = [get_user_email(user)]
            if settings.SEND_ACTIVATION_EMAIL:
                settings.EMAIL.activation(self.request, context).send(to)
            elif settings.SEND_CONFIRMATION_EMAIL:
                settings.EMAIL.confirmation(self.request, context).send(to)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = Token.objects.get_or_create(user=user)
            return Response({'token': token[0].key, 'avatar_url': user.avatar_url}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSocialLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = SocialLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'avatar_url': user.avatar_url}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = DzenUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
