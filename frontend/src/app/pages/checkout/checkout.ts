import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import BackButton from '../../components/back-button/back-button';
import { Api } from '../../services/api';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, MatIconModule, BackButton],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  store = inject(EcommerceStore);
  router = inject(Router);
  api = inject(Api);

  firstName = '';
  lastName = '';
  address = '';
  city = '';
  state = '';
  zip = '';
  error = '';

  get subtotal() {
    return this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  get tax() {
    return this.subtotal * 0.05;
  }

  get total() {
    return this.subtotal + this.tax;
  }

  placeOrder() {
    const orderData = {
      first_name: this.firstName,
      last_name: this.lastName,
      address: this.address,
      city: this.city,
      state: this.state,
      zip_code: this.zip,
      total: this.total.toFixed(2),
      items: this.store.cartItems().map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }))
    };

    this.api.createOrder(orderData).subscribe({
      next: () => {
        this.store.clearCart();
        this.router.navigate(['/order-success']);
      },
      error: () => {
        this.error = 'Failed to place order. Please try again.';
      }
    });
  }
}