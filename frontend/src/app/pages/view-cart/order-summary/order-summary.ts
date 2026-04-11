import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../../ecommerce-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [RouterLink],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
  store = inject(EcommerceStore);

  get subtotal() {
    return this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  get tax() {
    return this.subtotal * 0.05;
  }

  get total() {
    return this.subtotal + this.tax;
  }
}