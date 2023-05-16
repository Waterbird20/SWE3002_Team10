from rest_framework import serializers
# from .models import Account
from .models import StudentInfo


        
class StudentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentInfo
        # fields = "__all__"
        fields = ['email', 'name', 'student_id', 'Tutor_Course_id', 'Tutee_Course_id']
