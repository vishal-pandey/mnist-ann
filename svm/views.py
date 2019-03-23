from django.shortcuts import render
from django.http import HttpResponse
import json
import ast
from sklearn import svm
import pickle



def get_user(request, *args, **kwargs):
	image = request.GET['img']
	image = ast.literal_eval(image)
    
	f = open('/home/vishal/vishal/backend/mnist-ann/svm/svm.txt', 'rb')
	s = f.read()

	clf = pickle.loads(s)

	op = clf.predict([image])

	return HttpResponse(
		json.dumps({
			'op': str(op[0]),
			}),
		content_type='application/json')



