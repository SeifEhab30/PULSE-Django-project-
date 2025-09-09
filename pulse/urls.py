from django.urls import path
from . import views

urlpatterns = [
    path('', views.pulse, name='index'),
    path('about', views.about, name='about'),
    path('Contact', views.contact, name='Contact'),
    path('Products', views.product, name='Products'),
    path('Products-categ', views.productscat, name='Products-categ'),
    path('Products-by-cat/<slug:slug>/', views.productsbycat, name='Products-by-cat'),
    path('Products-detail/<slug:slug>/', views.productdet, name='Products-detail'),
    path('login', views.loginview, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout_view, name='logout'),
    path("cart/add/<int:product_id>/", views.add_to_cart_view, name="add_to_cart"),
    path("cart/remove/<slug:slug>/", views.remove_from_cart_view, name="remove_from_cart"),
    path("cart/", views.cart_page, name="cart_page"),
    path("checkout/", views.checkout_view, name="checkout"),
]
