import { HomeComponent } from './Components/home/home.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/login/login.component';
import { Component } from '@angular/core';
import { RegisterComponent } from './Components/register/register.component';
import { ProductComponent } from './Components/product/product.component';
import { CartComponent } from './Components/cart/cart.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedinGuard } from './core/guards/loggedin.guard';
import { DetailsComponent } from './Components/details/details.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate:[loggedinGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotpassword', component: ForgotpasswordComponent },


    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate:[authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
            { path: 'orders/:id', component: OrdersComponent },
      { path: 'allorders', component: AllordersComponent }

    ]
  },


  { path: '**', component: NotfoundComponent }
];