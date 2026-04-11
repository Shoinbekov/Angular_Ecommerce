import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
})
export default class BackButton {
  label = input('');
  navigateTo = input<string>();
}