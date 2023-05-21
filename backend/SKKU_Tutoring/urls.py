"""SKKU_Tutoring URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin
from django.urls import path
from SKKU_Tutoring import views
from django.conf.urls import include
from django.views.generic import TemplateView
from django.urls import re_path
from drf_yasg.views import get_schema_view
from drf_yasg       import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="SKKU tutoring",
        default_version='1.1.1',
        description="Team10 API 문서",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="이메일"), # 부가정보
        license=openapi.License(name="mit"),     # 부가정보
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    path('admin/', admin.site.urls),

    path('all-student',views.all_student),
    path('account-register', views.account_register),
    path('account-show/<str:pk>', views.account_show),
    
    path('tutoring-propose',views.TutoringPropose.as_view()),
    path('approved-tutoring-list',views.ApprovedTutoringList.as_view()),
    path('waiting-tutoring-list',views.WaitingTutoringList.as_view()),
    path('auth', include('rest_framework.urls', namespace='rest_framework')),

]
