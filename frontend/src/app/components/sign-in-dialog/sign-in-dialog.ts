import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';
import { EcommerceStore } from '../../ecommerce-store';

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

  email = '';
  password = '';
  showPassword = false;

  signIn() {
    this.store.setCurrentUser({ name: 'John Doe', email: this.email });
    this.dialogRef.close();
  }

  openSignUp() {
    this.dialogRef.close();
    this.dialog.open(SignUpDialog);
  }
}