import { Component, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { QtySelectorComponent } from '../../components/qty-selector/qty-selector';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelectorComponent, MatIconModule],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.css',
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStore);
}