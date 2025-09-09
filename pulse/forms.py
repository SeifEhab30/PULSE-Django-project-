from django import forms

from .models import comment, message

class commentForm(forms.ModelForm):
    class Meta:
        model = comment
        fields = ['name', 'body', 'image']


class messageForm(forms.ModelForm):
    class Meta:
        model = message
        fields = {'name', 'email', 'message'}