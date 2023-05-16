from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import StudentInfo

from .serializers import StudentInfoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.decorators import api_view #api
from rest_framework.response import Response #api 
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions


## 특정 계정 조회
## email을 key값으로 해당 계정 정보 조회
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


### todo
## 개설된 (튜터이름 + 과목이름 + 차있는 인원) get


