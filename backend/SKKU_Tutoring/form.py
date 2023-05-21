# forms.py 
from django import forms 
from .models import Tutoring

class TutorForm(forms.ModelForm): 
    class Meta: 
        model = Tutoring 
        fields = ['tutoring_id', 'tutor_grade','course_name','course_number','professor', 'syllabus', 'tutee1', 'tutee2', 'tutee3', 'tutee4', 'tutee5', 'mid_report1', 'mid_report2', 'mid_report3', 'mid_report4', 'mid_report5', 'mid_report6', 'mid_report7', 'mid_report8', 'mid_report9', 'mid_report10', 'credential_url', 'tongjang_url', 'ingunbee_url', 'receipt_url', 'report_url', 'completion'] 
