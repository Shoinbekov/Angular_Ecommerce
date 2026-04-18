import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { EcommerceStore } from './ecommerce-store';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <div class="h-[calc(100%-64px)] overflow-auto">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class App implements OnInit {
  protected readonly title = signal('ng-ecommerce');
  store = inject(EcommerceStore);
  api = inject(Api);

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.api.getProfile().subscribe({
        next: (user) => {
          this.store.setCurrentUser({ name: user.username, email: user.email });
          this.loadUserData();
        },
        error: () => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      });
    }
  }

  loadUserData() {
    // Load wishlist
    this.api.getWishlist().subscribe({
      next: (items) => {
        items.forEach((item: any) => {
          const product = {
            id: String(item.product.id),
            name: item.product.name,
            description: item.product.description,
            price: parseFloat(item.product.price),
            imageUrl: item.product.image_url,
            rating: item.product.rating,
            reviewCount: item.product.review_count,
            inStock: item.product.in_stock,
            category: item.product.category_name,
          };
          this.store.addToWishlist(product);
        });
      }
    });

    // Load cart
    this.api.getCart().subscribe({
      next: (items) => {
        items.forEach((item: any) => {
          const product = {
            id: String(item.product.id),
            name: item.product.name,
            description: item.product.description,
            price: parseFloat(item.product.price),
            imageUrl: item.product.image_url,
            rating: item.product.rating,
            reviewCount: item.product.review_count,
            inStock: item.product.in_stock,
            category: item.product.category_name,
          };
          this.store.addToCart(product, item.quantity);
        });
      }
    });
  }
}