from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Account
from .serializers import AccountSerializer
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.decorators import api_view #api
from rest_framework.response import Response #api 
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

'''
account_list - 계정 전체 조회(GET), 회원가입(POST)
account - pk로 특정 계정 조회(GET), 수정(PUT), 삭제(DELETE)
login - 로그인(POST)
'''

## 전체 회원정보 list
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def account_list(request):
    queryset = Account.objects.all()
    serializer = AccountSerializer(queryset, many=True)
    return Response(serializer.data)
    # if request.method == 'GET':
    #     queryset = Account.objects.all()
    #     serializer = AccountSerializer(queryset, many=True)
    #     return JsonResponse(serializer.data, safe=False)


## 회원가입
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def account_register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

## 특정 계정 조회
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def account_show(request, pk):
    obj = Account.objects.get(pk=pk)
    serializer = AccountSerializer(obj)
    return JsonResponse(serializer.data, safe=False)

## 특정 계정 수정
@api_view(['PUT'])
@permission_classes((permissions.AllowAny,))
def account_modify(request, pk):
    obj = Account.objects.get(pk=pk)
    data = JSONParser().parse(request)
    serializer = AccountSerializer(obj, data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

## 계정 삭제
@api_view(['DELETE'])
@permission_classes((permissions.AllowAny,))
def account_delete(request,pk):
    obj = Account.objects.get(pk=pk)
    obj.delete()
    return HttpResponse(status=204)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search_email = data['email']
        obj = Account.objects.get(email=search_email)

        if data['password'] == obj.password:
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=400)