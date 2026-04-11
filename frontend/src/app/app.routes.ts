import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products/all',
    },
    {
        path: 'products/:category',
        loadComponent: () => import('./pages/products-grid/products-grid'),
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/view-cart/view-cart'),
    },
    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
    },
    {
        path: 'order-success',
        loadComponent: () => import('./pages/order-success/order-success').then(m => m.OrderSuccess),
    },
    {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
    },
    {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
    canActivate: [authGuard],
    },
];