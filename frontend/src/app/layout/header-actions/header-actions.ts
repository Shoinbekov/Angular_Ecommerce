import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { Api } from '../../services/api';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.css',
})
export class HeaderActions {
  store = inject(EcommerceStore);
  dialog = inject(MatDialog);
  api = inject(Api);
  showDropdown = signal(false);

  openSignIn() {
    this.dialog.open(SignInDialog);
  }

  openSignUp() {
    this.dialog.open(SignUpDialog);
  }

  toggleDropdown() {
    this.showDropdown.update(v => !v);
  }

  signOut() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.api.logout(refreshToken).subscribe();
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.store.setCurrentUser(null);
    this.store.clearWishlist();
    this.store.clearCart();
    this.showDropdown.set(false);
  }
}