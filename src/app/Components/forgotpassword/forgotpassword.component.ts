import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  private readonly _authService = inject(AuthService);
  private readonly _Router = inject(Router);
  userEmail: string = '';
  errorMsg: string = '';
  step: number = 1;
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
verifyCode: FormGroup = new FormGroup({
  resetCode: new FormControl<string | null>(null, [
    Validators.required,
    Validators.pattern(/^\d{4,7}$/),
  ]),
});
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
verifyEmailSubmit(): void {
  if (this.verifyEmail.invalid) return;

  this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
    next: (res) => {
      console.log(res);
      if (res.statusMsg === 'success') {
        this.userEmail = this.verifyEmail.get('email')?.value;
        this.resetPassword.patchValue({
          email: this.userEmail
        });
        this.step = 2;
      }
    },
    error: (err) => {
      console.error(err);
      this.errorMsg = err.error?.message || err.message;
    },
  });
}
  verifyEmailCodeSubmit(): void {
    this._authService.verifyResetCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success')           
        this.step = 3;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPasswordSubmit(): void {
    this._authService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        this._authService.saveUserData();
        localStorage.setItem('userTOken', res.token);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSubmit(): void {
    if (this.step === 1) {
      if (this.verifyEmail.invalid) return this.verifyEmail.markAllAsTouched();
      this.resetPassword.patchValue({ email: this.verifyEmail.value.email });
      // call service to send code, then:
      this.step = 2;
    } else if (this.step === 2) {
      if (this.verifyCode.invalid) return this.verifyCode.markAllAsTouched();
      // verify code with backend, then:
      this.step = 3;
    } else if (this.step === 3) {
      if (this.resetPassword.invalid)
        return this.resetPassword.markAllAsTouched();
      // call service to reset password
    }
  }
}
