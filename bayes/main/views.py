from django.shortcuts import render
import _pickle as cPickle
from django.http import JsonResponse
from main.func import *
from main.tasks import *
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


class AddSpam(View):
    def post(self, request):
        print(json.loads(request.body)['sms'])
        request_sms = json.loads(request.body)['sms']
        assert isinstance(request_sms, str), 'ISINSTANCE'
        add_or_delete_message_from_spam.delay('a', request_sms)
        return JsonResponse({'status': 'OK'}, status=200)


class DeleteSpam(View):
    def post(self, request):
        print(json.loads(request.body)['sms'])
        request_sms = json.loads(request.body)['sms']
        assert isinstance(request_sms, str), 'ISINSTANCE'
        add_or_delete_message_from_spam.delay('d', request_sms)
        return JsonResponse({'status': 'OK'}, status=200)