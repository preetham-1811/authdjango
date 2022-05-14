from django.db import models

# Create your models here.
class Reminder(models.Model):
    
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)

    editors = models.JSONField(blank=True)
    viewers = models.JSONField(blank=True)

    def __str__(self):
        return f"{self.title}"