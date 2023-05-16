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
        
class Tutoring(models.Model):
    Tutoring = models.CharField(max_length = 45)
    tutor_id = models.IntegerField()
    professor = models.CharField(max_length = 45)
    Tutee = models.CharField(max_length = 100)
    Grade = models.FloatField()
    Syllabus = models.CharField(max_length = 45)
    Completion = models.CharField(max_length = 5)
    Approval = models.CharField(max_length=5)