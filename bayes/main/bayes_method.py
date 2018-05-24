from nltk.corpus import stopwords
from pprint import pprint
from redis import Redis
import re

redis_connector = Redis('localhost/1')


def import_data():
    stopWords = set(stopwords.words('english'))
    f = open('sms1.txt', 'r')
    a = f.readlines()
    ham = ''
    spam = ''
    for i in a:
        if i.startswith('ham'):
            ham += ' ' + i[4:]
        elif i.startswith('spam'):
            spam += ' ' + i[5:]
    ham_dict = {}
    spam_dict = {}
    for word in re.sub(r'[^\w\s]','',re.sub(r'^https?:\/\/.*[\r\n]*', '',ham)).split(' '):
        if word not in stopWords:
            if word in ham_dict.keys():
                ham_dict[word] += 1
            else:
                ham_dict[word] = 1

    for word in re.sub(r'[^\w\s]','',re.sub(r'^https?:\/\/.*[\r\n]*', '',spam)).split(' '):
        if word in spam_dict.keys():
            if word not in stopWords:
                spam_dict[word] += 1
        else:
            if word not in stopWords:
                spam_dict[word] = 1

    for a, b in enumerate(spam_dict.values()):
        if b == max(spam_dict.values()):
            print(list(spam_dict.keys())[a], b, ham_dict[list(spam_dict.keys())[a]])

    for a, b in enumerate(ham_dict.values()):
        if b == max(ham_dict.values()):
            print(list(ham_dict.keys())[a], b, spam_dict[list(ham_dict.keys())[a]])

    res_list = []
    for i in ham_dict.keys():
        if not any(i in j for j in res_list):
            res_list.append([i, ham_dict[i], 0])
    for i in spam_dict.keys():
        if not any(i in j for j in res_list):
            res_list.append([i, 0, spam_dict[i]])
        else:
            for j in res_list:
                if i in j:
                    j[2] += spam_dict[i]
    all_words_count = len(ham.split() + spam.split())
    print(all_words_count)
