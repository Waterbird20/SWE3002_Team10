from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
# from .models import Account
from .models import TutoringAdmin,StudentInfo,Tutoring

class TutoringAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutoringAdmin
        fields = "__all__"
        
class StudentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentInfo
        # fields = "__all__"
        fields = ['student_id', 'email', 'name', 'Tutor_Course_id', 'Tutee_Course_id']

class TutoringSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutoring
        fields = "__all__"
