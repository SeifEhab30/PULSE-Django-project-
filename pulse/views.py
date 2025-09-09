from django.shortcuts import render, get_object_or_404, redirect
from .forms import commentForm, messageForm
from .models import about_us, products, categories, Cart, CartItem
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.http import JsonResponse

# Create your views here.
def pulse(request):
    infos = about_us.objects.all()
    bests = products.objects.order_by('-price')[:3]
    return render(request, 'pulse/index.html',{'infos': infos,'bests':bests})


def product(request):
    product = products.objects.all()
    return render(request, 'pulse/Products.html',{'products':product})


def contact(request):
    if request.method == 'POST':
        form = messageForm(request.POST)

        if form.is_valid():
            message = form.save(commit=False)
            message.save()
    else:
        form = messageForm()
    return render(request, 'pulse/Contact.html',{'form':form})


def about(request):
    infos = about_us.objects.all()
    return render(request, 'pulse/about.html',{'infos': infos})


def productscat(request):
    cats = categories.objects.all()
    return render(request, 'pulse/Products-categ.html', {'cats': cats})


def productsbycat(request,slug):
    category = get_object_or_404(categories, slug=slug)
    product = products.objects.filter(category=category)
    return render(request, 'pulse/Products-by-cat.html', {
        'category': category,
        'products': product
    })


def productdet(request,slug):
    product=get_object_or_404(products,slug=slug)
    comments=product.comments.all().order_by('-date_added')
    if request.method == 'POST':
        form = commentForm(request.POST,request.FILES)

        if form.is_valid():
            comment = form.save(commit=False)
            comment.product = product
            comment.save()

            return redirect('Products-detail', slug=slug)
    else:
        form = commentForm()

    return render(request, 'pulse/Products-detail.html', {'product': product,'form': form,
                                                          'comments':comments})



def loginview(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("index")
        else:
            return render(request, "pulse/login.html", {"error": "Invalid username or password"})

    return render(request, "pulse/login.html")


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Log them in immediately
            return redirect('index')  # Redirect to home
    else:
        form = UserCreationForm()

    return render(request, 'pulse/register.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('index')

def get_user_cart(user):
    cart, created = Cart.objects.get_or_create(user=user)
    return cart

def add_to_cart(user, product_id):
    cart = get_user_cart(user)
    product = products.objects.get(id=product_id)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    item.save()
    return item

def remove_from_cart(user, slug):
    cart = get_user_cart(user)
    item = CartItem.objects.get(cart=cart, product__slug=slug)
    item.delete()

def cart_page(request):
    cart = get_user_cart(request.user)
    items = cart.items.select_related("product")
    total = sum(item.product.price  for item in items)
    return render(request, "pulse/cart.html", {"items": items, "total": total})

def add_to_cart_view(request, product_id):
    cart = get_user_cart(request.user)
    product = get_object_or_404(products, id=product_id)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        # if you later reintroduce quantity, you’d increment it here
        pass

    item.save()

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({
            "message": "Item added to cart",
            "cart_count": cart.items.count()
        })

    return redirect("cart_page")


def remove_from_cart_view(request, slug):
    remove_from_cart(request.user, slug)
    return redirect("cart_page")

def checkout_view(request):
    if request.user.is_authenticated:
        cart = get_user_cart(request.user)
        cart.items.all().delete()  # Clear the cart
        messages.success(request, "Checkout successful! Thank you for your order.")
    else:
        return redirect("login")

    return redirect("index")  # Send them back to the homepage