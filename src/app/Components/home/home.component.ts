import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { BaseProduct } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SalesPipe } from '../../core/pipes/sales.pipe';
import { CutstringPipe } from '../../core/pipes/cutstring.pipe';
import { FilterOnSearchPipe } from '../../core/pipes/filter-on-search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { AddToCartResponse } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    CurrencyPipe,
    SalesPipe,
    CutstringPipe,
    FilterOnSearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  Math = Math;
  getAllProductSub: Subscription = new Subscription();
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _cartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  productList: BaseProduct[] = [];
  searchTerm: string = '';
  categoriesList: Category[] = [];
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getAllProductSub = this._productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe();
    // this.getAllCategories?.uns
  }
  addToCart(productId: string): void {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res.message); // "Product added successfully to your cart"
        console.log(res.numOfCartItems); // 1
        console.log(res.data.totalCartPrice); // 149
        this._ToastrService.success(res.message,'FreshCart')
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
