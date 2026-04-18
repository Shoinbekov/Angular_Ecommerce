from django.contrib import admin
from .models import WishlistItem, CartItem

admin.site.register(WishlistItem)
admin.site.register(CartItem)