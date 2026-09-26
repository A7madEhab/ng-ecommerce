import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { ProductDetails } from '../../core/interfaces/product';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _productsService = inject(ProductsService)
  productObj:ProductDetails|null=null;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(returnedId)=>{
        let productId = returnedId.get('id');   
        this._productsService.getSpecificProduct(productId).subscribe({
          next:(res)=>{
           this.productObj=res.data;        
          },
          error:(err)=>{
            console.log(err);           
          }
        })
      }
    })
  }
}
