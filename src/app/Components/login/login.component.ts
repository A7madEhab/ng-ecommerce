import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Use nonNullable builder for strict typing
  private readonly _formBuilder = inject(FormBuilder).nonNullable;
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  isLoading: boolean = false;
  errMsg: string = '';

  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]] // Simplified for login
  });

  loginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errMsg = '';

    this._authService.setLoginForm(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.message === 'success') {
          // 1. Save JWT token for authenticated requests
          localStorage.setItem('userToken', response.token);

          // 2. Decode user data or notify Auth state if needed, then navigate
          this._router.navigate(['/home']);
        }
      },

      error: (err) => {
        this.isLoading = false;
        // Display backend error message to user
        this.errMsg = err.error?.message || 'An error occurred during login.';
      }
    });
  }
}