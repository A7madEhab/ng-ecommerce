import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckoutRequest } from '../../core/interfaces/payment';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  cardId:string|null="";
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
       this.cardId = params.get('id');
      },
    });
  }
  private fb = inject(FormBuilder);
  private readonly _paymentService = inject(PaymentService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Router = inject(Router);
  checkoutForm: FormGroup = this.fb.group({
    shippingAddress: this.fb.group({
      details: ['', [Validators.required, Validators.minLength(3)]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: ['', Validators.required],
    }),
  });
  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this._paymentService
      .createCashOrder(
       this.cardId,
        this.checkoutForm.value
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log( this.cardId);
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          console.error( this.cardId);
        },
      });
  }
}
