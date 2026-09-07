import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CategoryApiResponse, SingleCategoryResponse } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }
  private readonly _httpClient= inject(HttpClient)
  getAllCategories():Observable<CategoryApiResponse>{
    return this._httpClient.get<CategoryApiResponse>(`${environment.baseUrl}/categories`)
  }
  getCategoryById(id:string):Observable<SingleCategoryResponse>{
    return this._httpClient.get<SingleCategoryResponse>(`${environment.baseUrl}/categories/${id}`)
  }
}
