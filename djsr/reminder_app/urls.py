# djsr/authentication/urls.py
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import *


urlpatterns = [
	path('reminder/<int:pk>/', ReminderDetail.as_view(), name='detailcreate'),
    path('reminder/', ReminderList.as_view(), name='listcreate'),
    path('reminder_create/', ReminderCreate.as_view(), name="create_reminder"),
]