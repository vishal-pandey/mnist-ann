from django.shortcuts import render
from django.http import HttpResponse
import json
import ast
import numpy as np
from predict import weights1
import pickle

from .serializers import ImageSerializer
from predict import models as predict


import requests as rq
from bs4 import BeautifulSoup





def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


# Create your views here.

def actual_output(image, w_data):
    aop = []
    for j in range(0,10):
        d = np.dot(image, w_data[j])
        aop.append(d[0]/784)
    return aop.index(max(aop))

def decision_tree_classifier(request, *args, **kwargs):
    image = request.GET['img']
    image = ast.literal_eval(image)
    fr = open('predict/weights_dtc', 'rb')
    binn = fr.read()

    new_clf = pickle.loads(binn)
    op = new_clf.predict([image])
    op = op[0]

    ip = get_client_ip(request)

    data = predict.Image(source=ip, image=image, model_type='dtc', result=op)
    data.save()
    # ser = ImageSerializer(data = data)
    # print(ser.is_valid())
    return HttpResponse(
        json.dumps({
            'op': str(op)
            })
        )


def get_user(request, *args, **kwargs):
    image = request.GET['img']
    image = ast.literal_eval(image)
    w_data = weights1.X

    op=actual_output(image, w_data)

    ip = get_client_ip(request)

    data = predict.Image(source=ip, image=image, model_type='ann', result=op)
    data.save()

    return HttpResponse(
        json.dumps({
            'op': str(op),
            }),
        content_type='application/json')



def getUrl(request, *args, **kwargs):
    url = request.GET['url']
    post_type = request.GET['type']
    res = rq.get(url)
    soup = BeautifulSoup(res.text)
    video_url = ""
    if post_type == "1":
        video_url = soup.find("meta", {"property": "og:video:secure_url"})
        video_url = video_url['content']
        return HttpResponse(
            json.dumps({
                'url': str(video_url),
                }),
            content_type='application/json')


