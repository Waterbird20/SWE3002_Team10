from django.db import models


class Account(models.Model):
    name = models.CharField(max_length = 50)
    email = models.CharField(max_length = 200)
    password = models.CharField(max_length = 200)
    # created_at = models.DateTimeField(auto_now_add=True)