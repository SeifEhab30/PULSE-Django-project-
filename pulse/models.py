import uuid
from asyncio.windows_events import NULL

from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify
# Create your models here.
class about_us(models.Model):
    title1 = models.TextField()
    text1 = models.TextField()
    title2 = models.TextField()
    text2 = models.TextField()
    title3 = models.TextField()
    text3 = models.TextField()
    title4 = models.TextField()
    text4 = models.TextField()
    image = models.ImageField(upload_to='static/images/')


class categories(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to='static/images/')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class products(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    category = models.ForeignKey(categories, on_delete=models.CASCADE, related_name='products',default=NULL)
    desc =models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='static/images/')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class comment(models.Model):
    product = models.ForeignKey(products, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    body = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='static/images/',blank=True,null=True)

    def __str__(self):
        return self.product.title


class message(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    def __str__(self):
        return self.user.username

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(products, on_delete=models.CASCADE)
    def __str__(self):
        return self.product.title
