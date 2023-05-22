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
    admin = models.CharField(max_length=45, blank=True)
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
    time = models.IntegerField()
    credential_url = models.ImageField(null=True, upload_to="media", blank=True) # 수정
    tongjang_url = models.ImageField(null=True, upload_to="media", blank=True) # 수정
    ingunbee_url = models.ImageField(null=True, upload_to="media", blank=True) # 수정
    receipt_url = models.ImageField(null=True, upload_to="media", blank=True) # 수정
    report_url = models.ImageField(null=True, upload_to="media", blank=True) # 수정  form에서 빈 값을 허용
    completion = models.CharField(max_length=100, blank=True)
    class Meta:
        managed = False
        db_table = 'Tutoring'

class WeeklyReport(models.Model):
    report_id = models.CharField(max_length = 100,primary_key=True)
    course_number = models.CharField(max_length = 45)
    num = models.IntegerField()
    time = models.CharField(max_length = 45)
    attendance = models.CharField(max_length = 45)
    filename = models.CharField(max_length = 45)
    content = models.CharField(max_length=500)
    image_url = models.CharField(max_length=200)
    approval = models.IntegerField(blank=True)
    class Meta:
        managed = False
        db_table = 'Weekly_Report'