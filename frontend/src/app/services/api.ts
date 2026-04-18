import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  // Auth
  register(data: { email: string; username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register/`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login/`, data);
  }

  logout(refresh: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout/`, { refresh }, { headers: this.getHeaders() });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/profile/`, { headers: this.getHeaders() });
  }

  // Products
  getProducts(category?: string): Observable<any> {
    const url = category && category !== 'all'
      ? `${this.baseUrl}/products/?category=${category}`
      : `${this.baseUrl}/products/`;
    return this.http.get(url);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}/`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/categories/`);
  }

  // Orders
  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/`, data, { headers: this.getHeaders() });
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/`, { headers: this.getHeaders() });
  }

  // Wishlist
  getWishlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/store/wishlist/`, { headers: this.getHeaders() });
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/store/wishlist/`, { product_id: productId }, { headers: this.getHeaders() });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/store/wishlist/${productId}/`, { headers: this.getHeaders() });
  }

  // Cart
  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/store/cart/`, { headers: this.getHeaders() });
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/store/cart/`, { product_id: productId, quantity }, { headers: this.getHeaders() });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/store/cart/${productId}/`, { headers: this.getHeaders() });
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/store/cart/${productId}/update/`, { quantity }, { headers: this.getHeaders() });
  }
}