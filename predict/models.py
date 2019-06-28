from django.db import models

# Create your models here.




# Create your models here.
class Image(models.Model):
	source = models.TextField()
	image = models.TextField()
	model_type = models.TextField()
	result = models.TextField()
