import { Component, inject } from '@angular/core';
import BackButton from '../../components/back-button/back-button';
import { ListCartItems } from './list-cart-items/list-cart-items';
import { OrderSummary } from './order-summary/order-summary';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, OrderSummary, MatIconModule, RouterLink],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.css',
})
export default class ViewCart {
  store = inject(EcommerceStore);
}