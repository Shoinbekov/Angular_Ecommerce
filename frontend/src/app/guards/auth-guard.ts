import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EcommerceStore } from '../ecommerce-store';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(EcommerceStore);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');

  if (token && store.currentUser()) {
    return true;
  }

  router.navigate(['/products/all']);
  return false;
};