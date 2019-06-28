from django.contrib import admin
from .models import Image

# Register your models here.
# admin.site.register(Image)

class ImageAdmin(admin.ModelAdmin):
	model = Image
	list_display = ["source", "image", "model_type", "result"]

admin.site.register(Image, ImageAdmin)
