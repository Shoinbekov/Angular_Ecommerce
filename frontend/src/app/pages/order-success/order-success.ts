import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, MatIconModule],
  templateUrl: './order-success.html',
  styleUrl: './order-success.css',
})
export class OrderSuccess {}