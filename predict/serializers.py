from rest_framework import serializers
from .models import Image
from rest_framework import generics, permissions, serializers
from django.contrib.auth import get_user_model
from oauth2_provider.models import AbstractAccessToken

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("source", "image", "model_type", "result")