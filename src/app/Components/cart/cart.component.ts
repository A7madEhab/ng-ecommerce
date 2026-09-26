import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart, GetCartResponse } from '../../core/interfaces/cart';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
cartItems:Cart={} as Cart;
ngOnInit(): void {
this.getCartItems()

}
private readonly _cartService=inject(CartService)
getCartItems():void{
   this._cartService.getItemsInCart().subscribe({
    next:(res)=>{
      console.log(res);     
      this.cartItems=res.data;
    }
  });
}
}
