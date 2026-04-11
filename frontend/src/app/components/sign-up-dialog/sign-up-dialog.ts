import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [FormsModule, MatDialogModule, MatIconModule],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.css',
})
export class SignUpDialog {
  dialogRef = inject(MatDialogRef<SignUpDialog>);
  dialog = inject(MatDialog);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  createAccount() {
    console.log('Sign up:', this.name, this.email, this.password);
    this.dialogRef.close();
  }

  openSignIn() {
    this.dialogRef.close();
    this.dialog.open(SignInDialog);
  }
}