from django.urls import path
from . import views

urlpatterns = [
    path('wishlist/', views.WishlistView.as_view(), name='wishlist'),
    path('wishlist/<int:product_id>/', views.WishlistView.as_view(), name='wishlist-delete'),
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/<int:product_id>/', views.CartView.as_view(), name='cart-delete'),
    path('cart/<int:product_id>/update/', views.update_cart_item, name='cart-update'),
]