from django.shortcuts import render
import _pickle as cPickle
from django.http import JsonResponse
from main.func import *
import json

# Create your views here.

from django.views import View


class CheckSms(View):
    def get(self, request):
        request_sms = json.loads(list(request.GET.keys())[0])['sms']
        print(json.loads(list(request.GET.keys())[0])['sms'])
        assert isinstance(request_sms, list), 'ERROR ISINSTANCE'
        result_list = classify_words(request_sms)
        return JsonResponse(data={'result': result_list}, status=200)
