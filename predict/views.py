from django.shortcuts import render
from django.http import HttpResponse
import json
import ast
import numpy as np
from predict import weights1
import pickle



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
    return HttpResponse(
        json.dumps({
            'op': str(op)
            })
        )


def get_user(request, *args, **kwargs):
    image = request.GET['img']
    image = ast.literal_eval(image)
    w_data = weights1.X


    vid=actual_output(image, w_data)

    return HttpResponse(
        json.dumps({
            'op': str(vid),
            }),
        content_type='application/json')



