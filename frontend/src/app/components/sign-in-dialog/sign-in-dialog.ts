import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';
import { EcommerceStore } from '../../ecommerce-store';
import { Api } from '../../services/api';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [FormsModule, MatDialogModule, MatIconModule],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.css',
})
export class SignInDialog {
  dialogRef = inject(MatDialogRef<SignInDialog>);
  dialog = inject(MatDialog);
  store = inject(EcommerceStore);
  api = inject(Api);

  email = '';
  password = '';
  showPassword = false;
  error = '';

  signIn() {
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        this.store.setCurrentUser({ name: res.user.username, email: res.user.email });
        this.loadUserData();
        this.dialogRef.close();
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }

  loadUserData() {
    this.api.getWishlist().subscribe({
      next: (items) => {
        items.forEach((item: any) => {
          const product = {
            id: String(item.product.id),
            name: item.product.name,
            description: item.product.description,
            price: parseFloat(item.product.price),
            imageUrl: item.product.image_url,
            rating: item.product.rating,
            reviewCount: item.product.review_count,
            inStock: item.product.in_stock,
            category: item.product.category_name,
          };
          this.store.addToWishlist(product);
        });
      }
    });

    this.api.getCart().subscribe({
      next: (items) => {
        items.forEach((item: any) => {
          const product = {
            id: String(item.product.id),
            name: item.product.name,
            description: item.product.description,
            price: parseFloat(item.product.price),
            imageUrl: item.product.image_url,
            rating: item.product.rating,
            reviewCount: item.product.review_count,
            inStock: item.product.in_stock,
            category: item.product.category_name,
          };
          this.store.addToCart(product, item.quantity);
        });
      }
    });
  }

  openSignUp() {
    this.dialogRef.close();
    this.dialog.open(SignUpDialog);
  }
}