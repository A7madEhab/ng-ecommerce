import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, retry } from 'rxjs';
import { ProductsListResponse } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private readonly _httpClient=inject(HttpClient)

getAllProducts():Observable<ProductsListResponse>{
return this._httpClient.get<ProductsListResponse>(`${environment.baseUrl}/products`)
}

getSpecificProduct(id:string):Observable<any>{
  return this._httpClient.get(`${environment.baseUrl}/products/${id}`)
}

}
