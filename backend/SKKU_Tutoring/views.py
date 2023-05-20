from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import TutoringAdmin,StudentInfo,Tutoring,WeeklyReport
from rest_framework import generics
from .serializers import TutoringAdminSerializer,StudentInfoSerializer,TutoringSerializer,WeeklyReportSerializer
from django.utils.decorators import method_decorator
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views import View
from rest_framework.decorators import api_view #api
from rest_framework.response import Response #api 
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.views.generic import TemplateView   
from django.views.generic import DetailView
from .form import TutorForm

##image
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def image_load(request):
    form = TutorForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        return HttpResponse("GOOD")
    else:
        return HttpResponse("BAD")
    
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
## 학번, 학수번호, 성적, 과목이름, 교수님, 지원동기, syllabus, 가능시간, 튜티(있다면)
@permission_classes((permissions.AllowAny,))
class TutoringPropose(APIView):

    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")

        tutoring_id = student_id + '_' + course_number

        # 새 Tutoring 객체에 대한 데이터를 준비
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

        # 새 Tutoring 객체를 생성
        serializer = TutoringAdminSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

## 내가 개설한 튜터링 리스트
@permission_classes((permissions.AllowAny,))
def get_made_tutoring(request, student_id):
    try:
        student = StudentInfo.objects.get(student_id=student_id)
        tutor_courses = student.Tutor_Course_id.split(',')
        course_info = []
        for course_id in tutor_courses:
            try:
                tutoring = Tutoring.objects.get(tutoring_id=course_id)
                course_info.append({
                    'tutor_grade': tutoring.tutor_grade,
                    'course_name': tutoring.course_name,
                    'course_number': tutoring.course_number,
                    'professor': tutoring.professor,
                })
            except Tutoring.DoesNotExist:
                course_info.append({'error': f'No Tutoring found for course_id: {course_id}'})
        return JsonResponse(course_info, safe=False)
    except StudentInfo.DoesNotExist:
        return JsonResponse({'error': 'Invalid student id'}, status=400)
    
## 내가 참여중인 튜터링 리스트
@permission_classes((permissions.AllowAny,))
def get_participate_tutoring(request, student_id):
    try:
        student = StudentInfo.objects.get(student_id=student_id)
        tutor_courses = student.Tutee_Course_id.split(',')
        course_info = []
        for course_id in tutor_courses:
            try:
                tutoring = Tutoring.objects.get(tutoring_id=course_id)
                course_info.append({
                    'tutor_grade': tutoring.tutor_grade,
                    'course_name': tutoring.course_name,
                    'course_number': tutoring.course_number,
                    'professor': tutoring.professor,
                })
            except Tutoring.DoesNotExist:
                course_info.append({'error': f'No Tutoring found for course_id: {course_id}'})
        return JsonResponse(course_info, safe=False)
    except StudentInfo.DoesNotExist:
        return JsonResponse({'error': 'Invalid student id'}, status=400)
## 승인 대기중인 튜터링 list
@permission_classes((permissions.AllowAny,))
class AdminWaitingTutoringList(generics.ListAPIView):
    queryset = TutoringAdmin.objects.filter(approval=0)
    serializer_class = TutoringAdminSerializer
## 승인 완료된 튜터링 list
@permission_classes((permissions.AllowAny,))
class AdminApprovedTutoringList(generics.ListAPIView):
    queryset = TutoringAdmin.objects.filter(approval=1)
    serializer_class = TutoringAdminSerializer

## 학수번호, 학번을 받아 해당 튜터링 정보를 리턴

@permission_classes((permissions.AllowAny,))
class TutoringInfo(View):
    def get(self, request, student_id, course_number):
        if not student_id or not course_number:
            return JsonResponse({'error': 'Missing student_id or course_number'}, status=400)
        
        try:
            student = StudentInfo.objects.get(student_id=student_id)
        except StudentInfo.DoesNotExist:
            return JsonResponse({'error': 'Invalid student id'}, status=400)
        
        tutoring_id = student_id + '_' + course_number
        obj = Tutoring.objects.get(pk=tutoring_id)
        serializer = TutoringSerializer(obj)
        return JsonResponse(serializer.data, safe=False)

## 튜터링 승인
## 학번, 학수번호
@permission_classes((permissions.AllowAny,))
class AdminTutoringApprove(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")

        tutoring_id = student_id + '_' + course_number

            
        # TutoringAdmin 객체 찾기
        try:
            tutoring_admin = TutoringAdmin.objects.get(tutoring_id=tutoring_id)
        except TutoringAdmin.DoesNotExist:
            return Response({"error": "TutoringAdmin 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        # TutoringAdmin 객체의 approval을 1로 변경
        tutoring_admin.approval = 1
        tutoring_admin.save()
        tutee_list = []
        tmp = tutoring_admin.tutee.replace(" ","").split(',')
        for i in range(5):
            try:
                tutee_list.append(tmp[i])
            except IndexError:
                tutee_list.append(tmp[i])

        try:
            student = StudentInfo.objects.get(student_id=student_id)
            if student.Tutor_Course_id:
                student.Tutor_Course_id += ',' + tutoring_id
            else:
                student.Tutor_Course_id = tutoring_id
            if student.Tutee_Course_id:
                student.Tutee_Course_id += ',' + tutoring_id
            else:
                student.Tutor_Course_id = tutoring_id
            student.save()

        except StudentInfo.DoesNotExist:
            return JsonResponse({'error': 'Invalid student id'}, status=400)
        # 새 Tutoring 객체에 대한 데이터
        data = {
            'tutoring_id': tutoring_id,
            'tutor_grade': tutoring_admin.tutor_grade,
            'course_name': tutoring_admin.course_name,
            'course_number' : tutoring_admin.course_number,
            'professor': tutoring_admin.professor,
            'syllabus': tutoring_admin.syllabus,
            'tutee1': tutee_list[0],
            'tutee2': tutee_list[1],
            'tutee3': tutee_list[2],
            'tutee4': tutee_list[3],
            'tutee5': tutee_list[4],
            'completion': '',
            'mid_report': '',
            'final_report': '',
        }

        # 새 Tutoring 객체를 생성
        serializer = TutoringSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
## 튜터링 반려
## 학번, 학수번호
@permission_classes((permissions.AllowAny,))
class AdminTutoringReturn(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")

        tutoring_id = student_id + '_' + course_number

        # TutoringAdmin 객체 찾기
        try:
            tutoring_admin = TutoringAdmin.objects.get(key=tutoring_id)
        except TutoringAdmin.DoesNotExist:
            return Response({"error": "TutoringAdmin 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        # TutoringAdmin 객체의 approval을 1로 변경
        tutoring_admin.approval = -1
        tutoring_admin.save()
        
## 중간보고서 업로드
## 학번, 학수번호, 몇회차, 시간, 참석현황, 이미지URL, 학습내용
@permission_classes((permissions.AllowAny,))
class WeeklyReportUpload(APIView):

    def post(self, request):
        student_id = request.data.get("student_id")
        course_number = request.data.get("course_number")
        num = request.data.get('num')
        time = request.data.get("time")
        attendance = request.data.get("attendance")
        imageURL = request.data.get('imageURL')
        content = request.data.get("content")



        tutoring_id = student_id + '_' + course_number

        # StudentInfo 객체 찾기
        try:
            tutoring = Tutoring.objects.get(pk=tutoring_id)
        except Tutoring.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
            
        # 새 Tutoring 객체에 대한 데이터를 준비합니다.
        data = {
            'report_id': tutoring_id+'_'+num,
            'course_number' : course_number,
            'num': num,
            'time': time,
            'attendance' : attendance,
            'content': content,
            'image_url' : imageURL,
            'approval' : '0'

        }

        # 새 Tutoring 객체를 생성합니다.
        serializer = WeeklyReportSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
## 승인 대기중인 중간보고서 list
@permission_classes((permissions.AllowAny,))
class AdminWaitingWeeklyList(generics.ListAPIView):
    queryset = WeeklyReport.objects.filter(approval=0)
    serializer_class = WeeklyReportSerializer
    
    
## 중간보고서 승인
## 학번, 학수번호, 몇회차, 학습시간
@permission_classes((permissions.AllowAny,))
class AdminWeeklyApprove(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")
        num = request.data.get('num')
        tutoring_time = request.data.get('tutoring_time')
        try:
            tutoring_time = int(tutoring_time)
        except ValueError:
            return JsonResponse({'error': 'Invalid tutoring_time value'}, status=400)
        
        tutoring_id = student_id + '_' + course_number

        
        # WeeklyReport 객체 찾기
        try:
            weeklyreport = WeeklyReport.objects.get(key=tutoring_id+'_'+num)
        except WeeklyReport.DoesNotExist:
            return Response({"error": "WeeklyReport 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        weeklyreport.approval = 1
        weeklyreport.save()
               
        try:
            tutoring = Tutoring.objects.get(key=tutoring_id)
            if num == 1:
                tutoring.mid_report1 = 'T'
                tutoring.time += tutoring_time
            elif num == 2:
                tutoring.mid_report2 = 'T'
                tutoring.time += tutoring_time
            elif num == 3:
                tutoring.mid_report3 = 'T'
                tutoring.time += tutoring_time
            elif num == 4:
                tutoring.mid_report4 = 'T'
                tutoring.time += tutoring_time   
            elif num == 5:
                tutoring.mid_report5 = 'T'
                tutoring.time += tutoring_time
            elif num == 6:
                tutoring.mid_report6 = 'T'
                tutoring.time += tutoring_time
            elif num == 7:
                tutoring.mid_report7 = 'T'
                tutoring.time += tutoring_time    
            elif num == 8:
                tutoring.mid_report8 = 'T'
                tutoring.time += tutoring_time
            elif num == 9:
                tutoring.mid_report9 = 'T'
                tutoring.time += tutoring_time
            elif num == 10:
                tutoring.mid_report10 = 'T'
                tutoring.time += tutoring_time    
            tutoring.save()

        except Tutoring.DoesNotExist:
            return JsonResponse({'error': 'Invalid tutoring_id'}, status=400)
        
## 중간보고서 반려
## 학번, 학수번호, 몇회차, 반려사유
@permission_classes((permissions.AllowAny,))
class AdminWeeklyReturn(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")
        num = request.data.get('num')
        return_reason = request.data.get('retrun_reason')
        
        tutoring_id = student_id + '_' + course_number

        
        # WeeklyReport 객체 찾기
        try:
            weeklyreport = WeeklyReport.objects.get(key=tutoring_id+'_'+num)
        except WeeklyReport.DoesNotExist:
            return Response({"error": "WeeklyReport 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        weeklyreport.approval = -1
        weeklyreport.save()
               
        try:
            tutoring = Tutoring.objects.get(key=tutoring_id)
            if num == 1:
                tutoring.mid_report1 = return_reason
            elif num == 2:
                tutoring.mid_report2 = return_reason
            elif num == 3:
                tutoring.mid_report3 = return_reason
            elif num == 4:
                tutoring.mid_report4 = return_reason   
            elif num == 5:
                tutoring.mid_report5 = return_reason
            elif num == 6:
                tutoring.mid_report6 = return_reason
            elif num == 7:
                tutoring.mid_report7 = return_reason    
            elif num == 8:
                tutoring.mid_report8 = return_reason
            elif num == 9:
                tutoring.mid_report9 = return_reason
            elif num == 10:
                tutoring.mid_report10 = return_reason    
            tutoring.save()

        except Tutoring.DoesNotExist:
            return JsonResponse({'error': 'Invalid tutoring_id'}, status=400)

## 튜터링 신청(튜티)
## 학번, 학수번호, 튜터링개설자이름
@permission_classes((permissions.AllowAny,))
class TutoringApply(APIView):

    def post(self, request):
        student_id = request.data.get('student_id')
        tutor_name = request.data.get('tutor_name')
        course_number = request.data.get("course_number")
        # StudentInfo 객체 찾기
        try:
            student_info = StudentInfo.objects.get(name=tutor_name)
        except StudentInfo.DoesNotExist:
            return Response({"error": "StudentInfo 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        tutoring_id = student_info.student_id + '_' + course_number

        # Tutoring 객체 찾기
        try:
            tutoring = Tutoring.objects.get(key=tutoring_id)
        except Tutoring.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        
        # tutoring 인원 확인    
        where = 0
        if tutoring.tutee1 == '': where = 1
        elif tutoring.tutee2 == '': where = 2
        elif tutoring.tutee3 == '': where = 3
        elif tutoring.tutee4 == '': where = 4
        elif tutoring.tutee5 == '': where = 5

        # tutoring apply
        if where == 1:
            tutoring.tutee1 = student_id
            tutoring.save()
        elif where == 2:
            tutoring.tutee2 = student_id
            tutoring.save()
        elif where == 3:
            tutoring.tutee3 = student_id
            tutoring.save()
        elif where == 4:
            tutoring.tutee4 = student_id
            tutoring.save()
        elif where == 5:
            tutoring.tutee5 = student_id
            tutoring.save()
        else:
            # 인원 초과
            return Response({"error": "Tutoring 인원이 가득찼습니다."}, 
                            status=status.HTTP_304_NOT_MODIFIED)
            
        data1 = Tutoring.objects.get(pk=tutoring_id)
        serializer1 = TutoringSerializer(data=data1)
        if not serializer1.is_valid():
            return Response(serializer1.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # 학생 정보 업데이트
        student_info.Tutee_Course_id = tutoring.tutoring_id
        student_info.save()
        
        data2 = StudentInfo.objects.get(student_id=student_id)
        serializer2 = StudentInfoSerializer(data=data2)
        if not serializer2.is_valid():
            return Response(serializer2.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer1.data, serializer2.data, status=status.HTTP_202_ACCEPTED)

## 튜터링 철회(튜티)
## 학번, 학수번호, 튜터링개설자이름
@permission_classes((permissions.AllowAny,))
class TutoringApply(APIView):

    def post(self, request):
        student_id = request.data.get('student_id')
        tutor_name = request.data.get('tutor_name')
        course_number = request.data.get("course_number")
        # StudentInfo 객체 찾기
        try:
            student_info = StudentInfo.objects.get(name=tutor_name)
        except StudentInfo.DoesNotExist:
            return Response({"error": "StudentInfo 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        tutoring_id = student_info.student_id + '_' + course_number

        # Tutoring 객체 찾기
        try:
            tutoring = Tutoring.objects.get(key=tutoring_id)
        except Tutoring.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        
        # tutoring 인원 확인    
        num = 0
        if tutoring.tutee1 == student_id: tutoring_id.tutee1 = ''
        if tutoring.tutee2 == student_id: tutoring_id.tutee2 = ''
        if tutoring.tutee3 == student_id: tutoring_id.tutee3 = ''
        if tutoring.tutee4 == student_id: tutoring_id.tutee4 = ''
        if tutoring.tutee5 == student_id: tutoring_id.tutee5 = ''
        tutoring.save()
            
        data1 = Tutoring.objects.get(pk=tutoring_id)
        serializer1 = TutoringSerializer(data=data1)
        if not serializer1.is_valid():
            return Response(serializer1.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # 학생 정보 업데이트
        student_info.Tutee_Course_id = ''
        student_info.save()
        
        data2 = StudentInfo.objects.get(student_id=student_id)
        serializer2 = StudentInfoSerializer(data=data2)
        if not serializer2.is_valid():
            return Response(serializer2.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer1.data, serializer2.data, status=status.HTTP_202_ACCEPTED)

## 최종보고서 승인
## 학번, 학수번호
@permission_classes((permissions.AllowAny,))
class AdminFinalApprove(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")
        tutoring_id = student_id + '_' + course_number
        # WeeklyReport 객체 찾기
        try:
            tutoring = Tutoring.objects.get(key=tutoring_id)
            tutoring.completion = 'T'
        except WeeklyReport.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
             
## 최종보고서 반려
## 학번, 학수번호, 반려사유
@permission_classes((permissions.AllowAny,))
class AdminFinalReturn(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")
        return_reason = request.data.get('retrun_reason')
        
        tutoring_id = student_id + '_' + course_number

        
        # WeeklyReport 객체 찾기
        try:
            tutoring = Tutoring.objects.get(key=tutoring_id)
            tutoring.completion = return_reason
        except WeeklyReport.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)