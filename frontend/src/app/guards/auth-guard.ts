import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EcommerceStore } from '../ecommerce-store';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../components/sign-in-dialog/sign-in-dialog';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(EcommerceStore);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  const token = localStorage.getItem('access_token');

  if (token) {
    return true;
  }

  router.navigate(['/products/all']);
  dialog.open(SignInDialog);
  return false;
};