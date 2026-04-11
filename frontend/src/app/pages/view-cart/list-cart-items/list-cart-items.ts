import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../../ecommerce-store';
import { ShowCartItem } from '../../show-cart-item/show-cart-item';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-cart-items',
  imports: [ShowCartItem, MatIconModule],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.css',
})
export class ListCartItems {
  store = inject(EcommerceStore);
}