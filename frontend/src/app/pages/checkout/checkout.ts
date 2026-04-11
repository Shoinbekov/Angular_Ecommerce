import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import BackButton from '../../components/back-button/back-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, MatIconModule, BackButton],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  store = inject(EcommerceStore);
  router = inject(Router);

  firstName = '';
  lastName = '';
  address = '';
  city = '';
  state = '';
  zip = '';

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
    this.store.clearCart();
    this.router.navigate(['/order-success']);
  }
}