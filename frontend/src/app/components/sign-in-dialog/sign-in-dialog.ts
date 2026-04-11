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
        this.dialogRef.close();
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }

  openSignUp() {
    this.dialogRef.close();
    this.dialog.open(SignUpDialog);
  }
}