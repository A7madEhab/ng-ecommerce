import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AddToCartResponse, GetCartResponse } from '../interfaces/cart';

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
      { productId: id },
      { headers: { token: this.token ?? '' } }
    );
  }
  getItemsInCart():Observable<GetCartResponse>{
    return this._httpClient.get<GetCartResponse>(`${environment.baseUrl}/cart`,
      { headers: { token: this.token ?? '' } }
    )
  }
}