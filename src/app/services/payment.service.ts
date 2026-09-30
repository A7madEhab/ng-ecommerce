import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CheckoutRequest } from '../core/interfaces/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private readonly _httpCline: HttpClient) {}
 createCashOrder(cartId: string|null, body: CheckoutRequest): Observable<any> {
    const token = localStorage.getItem('userToken') || '';

    const headers = new HttpHeaders({
      token: token,
    });

    return this._httpCline.post(
      `${environment.baseUrl}/orders/${cartId}`,
      body,
      { headers }
    );
  }
}