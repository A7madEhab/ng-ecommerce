import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginPayload } from '../interfaces/login-payload';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterPayload } from '../interfaces/register-payload';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly _httpClient = inject(HttpClient)
 private readonly _router = inject(Router)
private readonly _baseUrl:string=environment.baseUrl;
 userData:string ='';

setRegisterForm(data: RegisterPayload): Observable<AuthResponse> {
  return this._httpClient.post<AuthResponse>(
    `${this._baseUrl}/auth/signup`,
    data
  );
}
  setLoginForm(data: LoginPayload): Observable<AuthResponse> {
      return this._httpClient.post<AuthResponse>(`${this._baseUrl}/auth/signin`, data);
    }
    saveUserData():void{
      if(localStorage.getItem('userToken')!==null){
        this.userData=jwtDecode(localStorage.getItem('userToken')!);
      }
    }
    logOut():void{
      localStorage.removeItem('userToken');
      this.userData='';
      this._router.navigate(['/login'])
    }
}
 