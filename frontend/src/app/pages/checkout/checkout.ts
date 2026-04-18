import { Component, inject, OnInit } from '@angular/core';
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
export class Checkout implements OnInit {
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

  cardNumber = '';
  cardExpiry = '';
  cardCvc = '';
  cardName = '';

  ngOnInit() {
    if (this.store.cartItems().length === 0) {
      this.router.navigate(['/cart']);
    }
  }

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
    if (this.store.cartItems().length === 0) {
      this.error = 'Your cart is empty!';
      return;
    }

    if (!this.firstName || !this.lastName || !this.address || !this.city || !this.state || !this.zip) {
      this.error = 'Please fill in all shipping fields!';
      return;
    }

    if (!this.cardNumber || !this.cardExpiry || !this.cardCvc || !this.cardName) {
      this.error = 'Please fill in all payment details!';
      return;
    }

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