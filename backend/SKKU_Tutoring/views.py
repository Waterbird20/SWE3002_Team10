from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist

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
from django.http import FileResponse

## Tutor Data POST
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def image_load(request):
    form = TutorForm(request.POST, request.FILES)
    if form.is_valid():
        tutoring_id = form.cleaned_data['tutoring_id']
        try:
            tutoring = Tutoring.objects.get(tutoring_id=tutoring_id)
            if 'credential_url' in form.cleaned_data and form.cleaned_data['credential_url'] and form.cleaned_data['credential_url'] != '':
                tutoring.credential_url = form.cleaned_data['credential_url']
            if 'tongjang_url' in form.cleaned_data and form.cleaned_data['tongjang_url'] and form.cleaned_data['tongjang_url'] != '':
                tutoring.tongjang_url = form.cleaned_data['tongjang_url']
            if 'ingunbee_url' in form.cleaned_data and form.cleaned_data['ingunbee_url'] and form.cleaned_data['ingunbee_url'] != '':
                tutoring.ingunbee_url = form.cleaned_data['ingunbee_url']
            if 'receipt_url' in form.cleaned_data and form.cleaned_data['receipt_url'] and form.cleaned_data['receipt_url'] != '':
                tutoring.receipt_url = form.cleaned_data['receipt_url']
            if 'report_url' in form.cleaned_data and form.cleaned_data['report_url'] and form.cleaned_data['report_url'] != '':
                tutoring.report_url = form.cleaned_data['report_url']
            tutoring.save()
            return HttpResponse("GOOD")
        except Tutoring.DoesNotExist:
            form.save()
            return HttpResponse("GOOD")
    else:
        return HttpResponse("BAD")
    
## Tutor Data GET
@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def get_file(request, pk, whatToGet):
    data_total = Tutoring.objects.get(tutoring_id=pk)
    if(whatToGet == "credential_url"):
        image = data_total.credential_url
    elif(whatToGet == "tongjang_url"):
        image = data_total.tongjang_url
    elif(whatToGet == "ingunbee_url"):
        image = data_total.ingunbee_url
    elif(whatToGet == "receipt_url"):
        image = data_total.receipt_url
    elif(whatToGet == "report_url"):
        image = data_total.report_url
    else:
        return HttpResponse("BAD")
    response = FileResponse(image, content_type='image/jpeg')
    return response

## 로그인 
## email
@permission_classes((permissions.AllowAny,))
class Login(APIView):
    """
    Retrieve the admin status of a student given their email.
    """
    def get(self, request):
        email = request.query_params.get('email', None)
        if email is not None:
            try:
                student = StudentInfo.objects.get(email=email)
                return Response({"admin": student.admin}, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({"error": "Student with provided email not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Email parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
## 특정 계정 조회
## 학번을 key값으로 해당 계정 정보 조회
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def account_show(request, email):
    obj = StudentInfo.objects.get(email=email)
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
## email, 학번, 이름, 관리자 여부(T)
## Tutor_Course_id, Tutee_Course_id는 공백 문자열로 저장됨
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def account_register(request):
    email = request.data.get('email')
    name = request.data.get('name')
    student_id = request.data.get('student_id')
    admin = request.data.get('admin')
    
    if admin == 'T':
        data = {
            'student_id' : '0',
            'email' : email,
            'name' : 'admin',
            'admin' : admin
        }
    else:
        data = {
            'student_id' : student_id,
            'email' : email,
            'name' : name
        }

    serializer = StudentInfoSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        tutor_courses = student.Tutor_Course_id.replace(" ","").split(',')
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
        tutor_courses = student.Tutee_Course_id.replace(" ","").split(',')
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
                tutee_list.append('')

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
            'time' : 0,
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
            tutoring_admin = TutoringAdmin.objects.get(tutoring_id=tutoring_id)
        except TutoringAdmin.DoesNotExist:
            return Response({"error": "TutoringAdmin 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        # TutoringAdmin 객체의 approval을 1로 변경
        tutoring_admin.approval = -1
        tutoring_admin.save()
        
## 중간보고서 업로드
## 학번, 학수번호, 몇회차, 참석현황, 이미지URL, 학습내용, 과목이름, 날짜, 진행시간
@permission_classes((permissions.AllowAny,))
class WeeklyReportUpload(APIView):

    def post(self, request):
        student_id = request.data.get("student_id")
        course_number = request.data.get("course_number")
        num = request.data.get('num')
        date_time = request.data.get("date_time")
        attendance = request.data.get("attendance")
        imageURL = request.data.get('imageURL')
        time = request.data.get('time')
        course_name = request.data.get('course_name')
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
            'date_time': date_time,
            'time' : time,
            'attendance' : attendance,
            'content': content,
            'image_url' : imageURL,
            'filename' : course_name +' '+str(num)+'회차 ' + date_time,
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
def AdminWaitingWeeklyList(request):
    weekly_reports = WeeklyReport.objects.all()

    data = []
    for weekly_report in weekly_reports:

        tmp = weekly_report.report_id.split('_')
        tutoring_id = tmp[0] +'_'+ tmp[1]+'_' + tmp[2]

        tutoring = get_object_or_404(Tutoring, tutoring_id=tutoring_id)

        report_data = {
            'report_id': weekly_report.report_id,
            'course_name': tutoring.course_name,
            'course_number': weekly_report.course_number,
            'num': weekly_report.num,
            'date_time': weekly_report.date_time,
            'time': weekly_report.time,
            'attendance': weekly_report.attendance,
            'filename': weekly_report.filename,
            'content': weekly_report.content,
            'image_url': weekly_report.image_url,
            'approval': weekly_report.approval,
        }

        data.append(report_data)

    return JsonResponse(data, safe=False)

## 자신의 중간보고서
## 학번, 학수번호
@permission_classes((permissions.AllowAny,))
class MyWeekly(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        course_number = request.data.get("course_number")
        tutoring_id = str(student_id) + '_' + str(course_number)
        reports = WeeklyReport.objects.filter(report_id__contains=tutoring_id)
        report_list = list(reports.values())
        return JsonResponse(report_list, safe=False)
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
            tutoring_time = float(tutoring_time)
        except ValueError:
            return JsonResponse({'error': 'Invalid tutoring_time value'}, status=400)
        
        tutoring_id = student_id + '_' + course_number

        
        
        # WeeklyReport 객체 찾기
        try:
            weeklyreport = WeeklyReport.objects.get(report_id=tutoring_id+'_'+str(num))
        except WeeklyReport.DoesNotExist:
            return Response({"error": "WeeklyReport 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        weeklyreport.approval = 1
        weeklyreport.save()
               
        try:
            tutoring = Tutoring.objects.get(tutoring_id=tutoring_id)
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
        
        return JsonResponse({'success': 'Weekly report has been successfully approved'}, status=200)
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
            weeklyreport = WeeklyReport.objects.get(report_id=tutoring_id+'_'+str(num))
        except WeeklyReport.DoesNotExist:
            return Response({"error": "WeeklyReport 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        weeklyreport.approval = -1
        weeklyreport.save()
               
        try:
            tutoring = Tutoring.objects.get(tutoring_id=tutoring_id)
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
        return JsonResponse({'success': 'Weekly report has been successfully approved'}, status=200)

## 튜터링 신청(튜티)
## 학번, 학수번호
@permission_classes((permissions.AllowAny,))
class TutoringApply(APIView):
    def post(self, request):
        student_id = request.data.get('student_id')
        tutoring_id = request.data.get("tutoring_id")
        # StudentInfo 객체 찾기
        try:
            student_info = StudentInfo.objects.get(student_id=student_id)
        except StudentInfo.DoesNotExist:
            return Response({"error": "StudentInfo 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        # Tutoring 객체 찾기
        try:
            tutoring = Tutoring.objects.get(tutoring_id=tutoring_id)
        except Tutoring.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        # 자신의 튜터링에 등록할 수 없음.
        if student_info.Tutor_Course_id == tutoring_id:
            return Response({"error": "자신이 개설한 Tutoring에 등록할 수 없습니다."}, 
                            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        
        # 수강중인 튜터링이 있는지 확인
        if student_info.Tutee_Course_id != '':
            return Response({"error": "다른 Tutoring에 이미 등록되어 있습니다."}, 
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        
        # tutoring 인원 확인    
        where = 0
        isin = 0
        if tutoring.tutee1 == '': where = 1
        elif tutoring.tutee2 == '': where = 2
        elif tutoring.tutee3 == '': where = 3
        elif tutoring.tutee4 == '': where = 4
        elif tutoring.tutee5 == '': where = 5

        if tutoring.tutee1 == student_id: isin = 1
        if tutoring.tutee2 == student_id: isin = 1
        if tutoring.tutee3 == student_id: isin = 1
        if tutoring.tutee4 == student_id: isin = 1
        if tutoring.tutee5 == student_id: isin = 1

        
        # tutoring apply
        if isin == 1:
            # 이미 등록됨
            return Response({"error": "해당 Tutoring에 이미 등록되어 있습니다."}, 
                            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        
        if where == 1:
            tutoring.tutee1 = student_id
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = tutoring_id
            student_info.save()
        elif where == 2:
            tutoring.tutee2 = student_id
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = tutoring_id
            student_info.save()
        elif where == 3:
            tutoring.tutee3 = student_id
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = tutoring_id
            student_info.save()
        elif where == 4:
            tutoring.tutee4 = student_id
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = tutoring_id
            student_info.save()
        elif where == 5:
            tutoring.tutee5 = student_id
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = tutoring_id
            student_info.save()
        else:
            # 인원 초과
            return Response({"error": "Tutoring 인원이 가득찼습니다."}, 
                            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        return Response({"success" : "True"}, status=status.HTTP_202_ACCEPTED)

## 튜터링 철회(튜티)
## 학번, 학수번호
@permission_classes((permissions.AllowAny,))
class TutoringOut(APIView):

    def post(self, request):
        student_id = request.data.get("student_id")
        tutoring_id = request.data.get("tutoring_id")
        # StudentInfo 객체 찾기
        try:
            student_info = StudentInfo.objects.get(student_id=student_id)
        except StudentInfo.DoesNotExist:
            return Response({"error": "StudentInfo 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)

        # Tutoring 객체 찾기
        try:
            tutoring = Tutoring.objects.get(tutoring_id=tutoring_id)
        except Tutoring.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        
        # tutoring tutee 위치 확인 
        where = 0
        isin = 0
        if tutoring.tutee1 == student_id: where = 1
        elif tutoring.tutee2 == student_id: where = 2
        elif tutoring.tutee3 == student_id: where = 3
        elif tutoring.tutee4 == student_id: where = 4
        elif tutoring.tutee5 == student_id: where = 5
        
        if where == 1:
            tutoring.tutee1 = ''
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = ''
            student_info.save()
        elif where == 2:
            tutoring.tutee2 = ''
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = ''
            student_info.save()
        elif where == 3:
            tutoring.tutee3 = ''
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = ''
            student_info.save()
        elif where == 4:
            tutoring.tutee4 = ''
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = ''
            student_info.save()
        elif where == 5:
            tutoring.tutee5 = ''
            tutoring.save()
            # 학생 정보 업데이트
            student_info.Tutee_Course_id = ''
            student_info.save()
        else:
            # 인원 초과
            return Response({"error": "해당 튜터링에 지원하지 않았습니다."}, 
                            status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        return Response({"success" : "True"}, status=status.HTTP_202_ACCEPTED)

@permission_classes((permissions.AllowAny,))
def AdminWaitingFinalList(request):
    weekly_reports = WeeklyReport.objects.all()

    data = []
    arr = []
    
    for weekly_report in weekly_reports:
        if weekly_report.approval == 0 or weekly_report.approval == -1:
            continue
        
        tmp = weekly_report.report_id.split('_')
        tutoring_id = tmp[0] +'_'+ tmp[1]+'_' + tmp[2]
        st = tmp[3]
        
        tmp_arr = []
        tmp_arr.append(tutoring_id)
        tmp_arr.append(st)
        tmp_arr.append(weekly_report.time)
        tmp_arr.append(weekly_report.attendance)

        arr.append(tmp_arr)
    
    tutoring_dict = {}
    for i in range(len(arr)):
        try:
            tutoring = Tutoring.objects.get(tutoring_id=arr[i][0])
        except Tutoring.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
        if arr[i][0] not in tutoring_dict:
            tutee_dict = {}
            for j in range(len(arr[i][3])):
                if arr[i][3][j] == '-':
                    break
                if j == 0:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee1] = 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee1] = 'X'
                if j == 1:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee2] = 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee2] = 'X'
                if j == 2:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee3] = 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee3] = 'X'
                if j == 3:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee4] = 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee4] = 'X'
                if j == 4:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee5] = 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee5] = 'X'
            tutoring_dict[arr[i][0]] = [1,arr[i][2],tutee_dict]
        else:
            tutoring_dict[arr[i][0]][0] += 1
            tutoring_dict[arr[i][0]][1] += arr[i][2]
            
            tutee_dict = tutoring_dict[arr[i][0]][2]
            for j in range(len(arr[i][3])):
                if arr[i][3][j] == '-':
                    break
                if j == 0:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee1] += 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee1] += 'X'
                if j == 1:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee2] += 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee2] += 'X'
                if j == 2:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee3] += 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee3] += 'X'
                if j == 3:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee4] += 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee4] += 'X'
                if j == 4:
                    if arr[i][3][j] == 'O':
                        tutee_dict[tutoring.tutee5] += 'O'
                    elif arr[i][3][j] == 'X':
                        tutee_dict[tutoring.tutee5] += 'X'
                tutoring_dict[arr[i][0]][2] = tutee_dict
                
            

    for key,val in tutoring_dict.items():
        
        student_id = key.split('_')[0]
        tutoring = get_object_or_404(Tutoring, tutoring_id=key)
        student = get_object_or_404(StudentInfo, student_id = student_id)
        final_data = {
            'course_name' : tutoring.course_name,
            'course_id' : tutoring.course_number,
            'total_count' : val[0],
            'total_time' : val[1],
            'tutor_name' : student.name,
            'status' : tutoring.completion,
            'credential_url': str(tutoring.credential_url),
            'tongjang_url' : str(tutoring.tongjang_url),
            'ingunbee_url' : str(tutoring.ingunbee_url),
            'receipt_url' : str(tutoring.receipt_url),
            'report_url' : str(tutoring.report_url),
            'tutee_attendance' : val[2]
        }

        data.append(final_data)

    return JsonResponse(data, safe=False)

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
            tutoring = Tutoring.objects.get(tutoring_id=tutoring_id)
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
            tutoring = Tutoring.objects.get(tutoring_id=tutoring_id)
            tutoring.completion = return_reason
        except WeeklyReport.DoesNotExist:
            return Response({"error": "Tutoring 객체를 찾을 수 없습니다."},
                            status=status.HTTP_404_NOT_FOUND)
