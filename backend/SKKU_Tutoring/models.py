from django.db import models


class StudentInfo(models.Model):
    email = models.CharField(max_length = 45,primary_key=True)
    name = models.CharField(max_length = 45)
    student_id = models.IntegerField()
    Tutor_Course_id = models.CharField(max_length=60, blank=True)
    Tutee_Course_id = models.CharField(max_length=60, blank=True)
    class Meta:
        managed = False
        db_table = 'Tutoring_account'