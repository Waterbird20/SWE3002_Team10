from django.db import models


class Account(models.Model):
    name = models.CharField(max_length = 50)
    email = models.CharField(max_length = 200)
    password = models.CharField(max_length = 200)
    # created_at = models.DateTimeField(auto_now_add=True)
    
class StudentId(models.Model):
    email = models.CharField(max_length = 45)
    name = models.CharField(max_length = 45)
    student_id = models.IntegerField()
    Tutor_Course_id = models.CharField(max_length=60)
    Tutee_Course_id = models.CharField(max_length=60)