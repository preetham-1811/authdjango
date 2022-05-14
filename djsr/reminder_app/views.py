from django.shortcuts import render
from rest_framework import generics, status, permissions
from .models import Reminder
from .serializers import ReminderSerializer
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.views import APIView
from rest_framework.response import Response


class ReminderUserWritePermission(BasePermission):
    message = 'You are not allowed to see this.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.username in obj.editors


class ReminderUserGetPermission(BasePermission):
    message = 'You are not allowed to see this.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.username in obj.editors or request.user.username in obj.viewers


class ReminderList(generics.ListCreateAPIView):
    serializer_class = ReminderSerializer
    model = Reminder
    
    def get_queryset(self):
        user = self.request.user.username
        print(user)
        return Reminder.objects.filter(editors__icontains=user)



class ReminderDetail(generics.RetrieveUpdateDestroyAPIView, ReminderUserWritePermission):
    permission_classes = [ReminderUserWritePermission]
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer



class ReminderCreate(APIView):

    def post(self, request):

        creator = request.user.username
        serializer = ReminderSerializer(data=request.data)
        
        if serializer.is_valid() and isinstance(request.data['editors'], list) and isinstance(request.data['viewers'], list):
            request.data['editors'].append(creator) if creator not in request.data['editors'] else request.data['editors']
            reminder = serializer.save()
            if reminder:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
