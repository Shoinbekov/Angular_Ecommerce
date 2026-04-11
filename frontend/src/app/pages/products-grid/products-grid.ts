import { Component, signal, inject, input, effect } from '@angular/core';
import { Product } from '../../models/product';
import ProductCard from '../../components/product-card/product-card';
import ToggleWishlistButton from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, ToggleWishlistButton, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export default class ProductsGrid {

  category = input<string>('all');
  store = inject(EcommerceStore);
  categories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);

  constructor() {
    effect(() => {
      this.store.setCategory(this.category());
    });
  }

  addToCart(product: Product) {
    console.log('Added to cart:', product);
  }
}