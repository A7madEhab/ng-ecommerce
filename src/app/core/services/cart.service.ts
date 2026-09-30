import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  AddToCartResponse,
  ClearCartResponse,
  DeleteCartItemResponse,
  GetCartResponse,
} from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private readonly _httpClient = inject(HttpClient);
  private readonly token = localStorage.getItem('userToken');

  addProductToCart(id: string): Observable<AddToCartResponse> {
    return this._httpClient.post<AddToCartResponse>(
      `${environment.baseUrl}/cart`,
      { productId: id }    );
  }
  getItemsInCart(): Observable<GetCartResponse> {
    return this._httpClient.get<GetCartResponse>(
      `${environment.baseUrl}/cart`,
      { headers: { token: this.token ?? '' } },
    );
  }
  removeCartItem(id: string): Observable<DeleteCartItemResponse> {
    return this._httpClient.delete<DeleteCartItemResponse>(
      `${environment.baseUrl}/cart/${id}`,
      {
        headers: {
          token: this.token ?? '',
        },
      },
    );
  }
  updateItemCount(id: string, qty: number) {
    return this._httpClient.put<GetCartResponse>(
      `${environment.baseUrl}/cart/${id}`,
      { count: qty },
      { headers: { token: this.token ?? '' } },
    );
  }
  ClearCart():Observable<ClearCartResponse> {
    return this._httpClient.delete<ClearCartResponse>(`${environment.baseUrl}/cart`, {
      headers: { token: this.token ?? '' },
    });
  }
}
