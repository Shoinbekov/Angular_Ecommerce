from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product-list'),
    path('<int:pk>/', views.product_detail, name='product-detail'),
    path('<int:pk>/manage/', views.ProductCRUDView.as_view(), name='product-crud'),
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
]