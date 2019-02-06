from django.urls import path
from predict import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('predict', views.get_user),
]