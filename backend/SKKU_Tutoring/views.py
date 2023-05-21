from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import TutoringAdmin,StudentInfo,Tutoring
from rest_framework import generics
from .serializers import TutoringAdminSerializer,StudentInfoSerializer,TutoringSerializer

from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view #api
from rest_framework.response import Response #api 
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


## 특정 계정 조회
## 학번을 key값으로 해당 계정 정보 조회
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def account_show(request, pk):
    obj = StudentInfo.objects.get(pk=pk)
    serializer = StudentInfoSerializer(obj)
    return JsonResponse(serializer.data, safe=False)

## 가입되어있는 모든 유저정보 get
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def all_student(request):
    queryset = StudentInfo.objects.all()
    serializer = StudentInfoSerializer(queryset, many=True)
    return Response(serializer.data)

## 회원가입
## email, 이름, 학번 정보 post
## Tutor_Course_id, Tutee_Course_id는 공백 문자열로 저장됨
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def account_register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = StudentInfoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


## 튜터링 신청
@permission_classes((permissions.AllowAny,))
class TutoringPropose(APIView):

    def post(self, request):
        name = request.data.get('name')
        course_number = request.data.get("course_number")
        # StudentInfo 객체 찾기
        try:
            student_info = StudentInfo.objects.get(name=name)
        except StudentInfo.DoesNotExist:
            return Response({"error": "StudentInfo 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        tutoring_id = student_info.student_id + '_' + course_number

        # 새 Tutoring 객체에 대한 데이터를 준비합니다.
        data = {
            'tutoring_id': tutoring_id,
            'tutor_grade': request.data.get('tutor_grade'),
            'course_name': request.data.get('course_name'),
            'course_number' : request.data.get('course_number'),
            'professor': request.data.get('professor'),
            'motive' : request.data.get('motive'),
            'syllabus': request.data.get('syllabus'),
            'available_time' : request.data.get('available_time'),
            'tutee': request.data.get('tutee'),
            'approval' : '0'

        }

        # 새 Tutoring 객체를 생성합니다.
        serializer = TutoringAdminSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

## 승인 대기중인 튜터링 list
class WaitingTutoringList(generics.ListAPIView):
    queryset = TutoringAdmin.objects.filter(approval=0)
    serializer_class = TutoringAdminSerializer
## 승인 완료된 튜터링 list
class ApprovedTutoringList(generics.ListAPIView):
    queryset = TutoringAdmin.objects.filter(approval=1)
    serializer_class = TutoringAdminSerializer
    
## 튜터링 승인
@permission_classes((permissions.AllowAny,))
class TutoringApprove(APIView):
    def post(self, request):
        name = request.data.get('name')
        course_number = request.data.get("course_number")
        # StudentInfo 객체 찾기
        try:
            student_info = StudentInfo.objects.get(name=name)
        except StudentInfo.DoesNotExist:
            return Response({"error": "StudentInfo 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        tutoring_id = student_info.student_id + '_' + course_number

        # TutoringAdmin 객체 찾기
        try:
            tutoring_admin = TutoringAdmin.objects.get(tutoring_id=tutoring_id)
        except TutoringAdmin.DoesNotExist:
            return Response({"error": "TutoringAdmin 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        # TutoringAdmin 객체의 approval을 1로 변경합니다.
        tutoring_admin.approval = 1
        tutoring_admin.save()

        tutee_list = list(tutoring_admin.tutee.strip().split(','))
        
        # 새 Tutoring 객체에 대한 데이터를 준비합니다.
        data = {
            'tutoring_id': tutoring_id,
            'tutor_grade': tutoring_admin.tutor_grade,
            'course_name': tutoring_admin.course_name,
            'course_number' : tutoring_admin.course_number,
            'professor': tutoring_admin.professor,
            'syllabus': tutoring_admin.syllabus,
            'tutee1': tutoring_admin.tutee1,
            'completion': '',
            'mid_report': '',
            'final_report': '',
        }

        # 새 Tutoring 객체를 생성합니다.
        serializer = TutoringSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)