import { Component, input, inject, computed } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { Api } from '../../services/api';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIconButton, MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.css',
})
export default class ToggleWishlistButton {

  product = input.required<Product>();
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
}