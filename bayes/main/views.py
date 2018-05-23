from django.shortcuts import render
import _pickle as cPickle
from django.http import JsonResponse
from main.func import *
import json

# Create your views here.

from django.views import View


class CheckSms(View):
    def post(self, request):
        print(json.loads(request.body)['sms'])
        request_sms = json.loads(request.body)['sms']
        assert isinstance(request_sms, list), 'ERROR ISINSTANCE'
        result_list = classify_words(request_sms)
        print(result_list)
        return JsonResponse(data={'result': result_list}, status=200)
