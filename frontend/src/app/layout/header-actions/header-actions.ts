import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.css',
})
export class HeaderActions {
  store = inject(EcommerceStore);
  dialog = inject(MatDialog);
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
    this.store.setCurrentUser(null);
    this.showDropdown.set(false);
  }
}