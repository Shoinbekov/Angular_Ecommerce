import { Component, inject, input, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import BackButton from '../../components/back-button/back-button';
import { QtySelectorComponent } from '../../components/qty-selector/qty-selector';

@Component({
  selector: 'app-product-detail',
  imports: [MatIconModule, BackButton, QtySelectorComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  store = inject(EcommerceStore);
  id = input.required<string>();

  quantity = signal(1);

  product = computed(() =>
    this.store.products().find(p => p.id === this.id())
  );

  isInWishlist = computed(() =>
    this.store.wishlistItems().find(p => p.id === this.id())
  );

  addToCart() {
    const product = this.product();
    if (product) {
      this.store.addToCart(product, this.quantity());
    }
  }

  toggleWishlist() {
    const product = this.product();
    if (!product) return;
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}