import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
   step:number=1;
verifyEmail:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
});
verifyCode: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.pattern(/^\d{6}$/)])
});
resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  });
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
       if (this.resetPassword.invalid) return this.resetPassword.markAllAsTouched();
       // call service to reset password
     }
   }
}