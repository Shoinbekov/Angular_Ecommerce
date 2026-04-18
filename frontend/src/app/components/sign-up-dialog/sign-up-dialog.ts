import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { EcommerceStore } from '../../ecommerce-store';
import { Api } from '../../services/api';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [FormsModule, MatDialogModule, MatIconModule],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.css',
})
export class SignUpDialog {
  dialogRef = inject(MatDialogRef<SignUpDialog>);
  dialog = inject(MatDialog);
  store = inject(EcommerceStore);
  api = inject(Api);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  createAccount() {
  if (this.password !== this.confirmPassword) {
    this.error = 'Passwords do not match';
    return;
  }
  this.api.register({ 
    email: this.email, 
    username: this.name,  // отправляем имя а не email
    password: this.password 
  }).subscribe({
    next: (res) => {
      localStorage.setItem('access_token', res.access);
      localStorage.setItem('refresh_token', res.refresh);
      this.store.setCurrentUser({ name: this.name, email: res.user.email });
      this.dialogRef.close();
    },
    error: () => {
      this.error = 'Registration failed. Try again.';
    }
  });
}

  openSignIn() {
    this.dialogRef.close();
    this.dialog.open(SignInDialog);
  }
}