import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart, GetCartResponse } from '../../core/interfaces/cart';
import Swal from 'sweetalert2';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  cartItems: Cart = {} as Cart;
  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems(): void {
    this._cartService.getItemsInCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems = res.data;
      },
    });
  }
  removeCartItem(id: string): void {
    this._cartService.removeCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateCartItem(id: string, qty: number): void {
    this._cartService.updateItemCount(id, qty).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems = res.data;
        console.log('About to show toast', this._toastrService);
        // this._toastrService.success(res.message);
        this._toastrService.success('Product added to cart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ClearCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to clear all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', // Bootstrap Danger Red
      cancelButtonColor: '#6c757d', // Bootstrap Secondary Gray
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      // Execute deletion only if user confirms
      if (result.isConfirmed) {
        this._cartService.ClearCart().subscribe({
          next: (res) => {
            if (res.message === 'success') {
              // Reset local UI state
              this._toastrService.success('Saved successfully');
              this.getCartItems();

              // Show success alert
              Swal.fire({
                title: 'Cleared!',
                text: 'Your cart is now empty.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
              });
            }
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to clear the cart. Please try again.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

}
