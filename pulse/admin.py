from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(about_us)
admin.site.register(comment)
admin.site.register(products)
admin.site.register(categories)
admin.site.register(message)
admin.site.register(Cart)
admin.site.register(CartItem)

