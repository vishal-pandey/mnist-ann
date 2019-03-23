from django.urls import path
from svm import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('svm', views.get_user),
]