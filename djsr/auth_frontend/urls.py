# djsr/frontend/urls.py
from django.urls import path, re_path
from .views import * 

urlpatterns = [
    path('', index),  # for the empty url
    path('signup/', index),
    path('login/', index),
    path('hello/', index),
    path('create_reminder/', index),
]