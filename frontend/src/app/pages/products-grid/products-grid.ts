import { Component, signal, inject, input, effect, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import ProductCard from '../../components/product-card/product-card';
import ToggleWishlistButton from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { Api } from '../../services/api';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, ToggleWishlistButton, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export default class ProductsGrid implements OnInit {

  category = input<string>('all');
  store = inject(EcommerceStore);
  api = inject(Api);
  categories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal('');

  constructor() {
    effect(() => {
      this.store.setCategory(this.category());
      this.loadProducts();
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.api.getProducts(this.category()).subscribe({
      next: (data) => {
        const mapped = data.map((p: any) => ({
          id: String(p.id),
          name: p.name,
          description: p.description,
          price: parseFloat(p.price),
          imageUrl: p.image_url,
          rating: p.rating,
          reviewCount: p.review_count,
          inStock: p.in_stock,
          category: p.category_name,
        }));
        this.products.set(mapped);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products');
        this.loading.set(false);
      }
    });
  }

  addToCart(product: Product) {
    this.store.addToCart(product);
  }
}