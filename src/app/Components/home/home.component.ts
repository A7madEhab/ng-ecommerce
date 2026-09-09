import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { BaseProduct } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{
  Math = Math;
  getAllProductSub:Subscription=new Subscription();
  private readonly _productsService =inject(ProductsService)
  private readonly _categoriesService =inject(CategoriesService)
  productList: BaseProduct[] = [];
  
  categoriesList:Category[]=[];
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: true
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items:6
      }    
    },
    nav: true
  }
  ngOnInit(): void {
this._categoriesService.getAllCategories().subscribe({
  next:(res)=>{
    console.log(res);
    this.categoriesList=res.data;
  },
  error:(err)=>{
    console.log(err);
    
  }
})

 this.getAllProductSub=   this._productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productList=res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
    // this.getAllCategories?.uns
  }
}
