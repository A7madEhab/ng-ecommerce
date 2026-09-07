import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { BaseProduct } from '../../core/interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly _productsService =inject(ProductsService)
productList: BaseProduct[] = [];
ngOnInit(): void {
this._productsService.getAllProducts().subscribe({
  next:(res)=>{
    console.log(res);
    this.productList=res.data;
  },
  error:(err)=>{
    console.log(err);
    
  }
});
}
}
