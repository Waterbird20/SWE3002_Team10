from django.db import models

class TutoringAdmin(models.Model):
    tutoring_id = models.CharField(max_length = 45,primary_key=True)
    tutor_grade = models.CharField(max_length = 5)
    course_name = models.CharField(max_length = 45)
    course_number = models.CharField(max_length = 45)
    professor = models.CharField(max_length=45)
    motive = models.CharField(max_length=200)
    syllabus = models.CharField(max_length = 200)
    available_time = models.CharField(max_length = 45)
    tutee = models.CharField(max_length = 100 , blank=True)
    approval = models.IntegerField(blank=True)
    class Meta:
        managed = False
        db_table = 'Tutoring_admin'
        
class StudentInfo(models.Model):
    student_id = models.CharField(max_length = 45,primary_key=True)
    email = models.CharField(max_length = 45)
    name = models.CharField(max_length = 45)
    Tutor_Course_id = models.CharField(max_length=60, blank=True)
    Tutee_Course_id = models.CharField(max_length=60, blank=True)
    class Meta:
        managed = False
        db_table = 'Tutoring_account'
        
class Tutoring(models.Model):
    tutoring_id = models.CharField(max_length = 45,primary_key=True)
    tutor_grade = models.CharField(max_length = 5)
    course_name = models.CharField(max_length = 45)
    course_number = models.CharField(max_length = 45)
    professor = models.CharField(max_length = 45)
    syllabus = models.CharField(max_length = 500, blank=True)
    tutee1 = models.CharField(max_length = 45, blank=True)
    tutee2 = models.CharField(max_length = 45, blank=True)
    tutee3 = models.CharField(max_length = 45, blank=True)
    tutee4 = models.CharField(max_length = 45, blank=True)
    tutee5 = models.CharField(max_length = 45, blank=True)
    mid_report1 = models.CharField(max_length=500, blank=True)
    mid_report2 = models.CharField(max_length=500, blank=True)
    mid_report3 = models.CharField(max_length=500, blank=True)
    mid_report4 = models.CharField(max_length=500, blank=True)
    mid_report5 = models.CharField(max_length=500, blank=True)
    mid_report6 = models.CharField(max_length=500, blank=True)
    mid_report7 = models.CharField(max_length=500, blank=True)
    mid_report8 = models.CharField(max_length=500, blank=True)
    mid_report9 = models.CharField(max_length=500, blank=True)
    mid_report10 = models.CharField(max_length=500, blank=True)
    credential_url = models.CharField(max_length=100, blank=True)
    tongjang_url = models.CharField(max_length=100, blank=True)
    ingunbee_url = models.CharField(max_length=100, blank=True)
    receipt_url = models.CharField(max_length=100, blank=True)
    report_url = models.CharField(max_length=100, blank=True)
    report_url = models.CharField(max_length=1000, blank = True)
    completion = models.CharField(max_length = 5, blank=True)
    class Meta:
        managed = False
        db_table = 'Tutoring'