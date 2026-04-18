import { Component, input, output, computed, inject } from '@angular/core';
import { Product } from '../../models/product';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { Api } from '../../services/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [MatIconModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export default class ProductCard {
  product = input.required<Product>();
  addToCartClicked = output<Product>();

  store = inject(EcommerceStore);
  api = inject(Api);

  isInWishlist = computed(() =>
    this.store.wishlistItems().find(p => p.id === this.product().id)
  );

  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
      if (this.store.currentUser()) {
        this.api.removeFromWishlist(product.id).subscribe();
      }
    } else {
      this.store.addToWishlist(product);
      if (this.store.currentUser()) {
        this.api.addToWishlist(product.id).subscribe();
      }
    }
  }

  addToCart(product: Product) {
    this.store.addToCart(product);
    if (this.store.currentUser()) {
      this.api.addToCart(product.id, 1).subscribe();
    }
  }
}