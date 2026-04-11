import { Component, inject } from '@angular/core';
import BackButton from '../../components/back-button/back-button';
import ProductCard from '../../components/product-card/product-card';
import { MatIconModule } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIconModule],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.css',
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}