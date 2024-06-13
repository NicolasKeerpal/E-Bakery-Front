import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      zipCode: ['01000', Validators.required],
      address: ['', Validators.required],
      town: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = { ...this.signUpForm.value };
      formData.zipCode = parseInt(formData.zipCode, 10);
      this.customerService.addCustomer(formData).subscribe(
        (response: any) => {
          if (response.success) {
            this.dialogMessage = 'Your account was create successfully ! Log in to your account.';
            this.showRedirectionDialog = true;
          } else {
            this.dialogMessage = 'sign up failed, please try again.';
            this.showDialog = true;
          }
        },
        (error: any) => {
          this.dialogMessage = error.message;
          this.showDialog = true;
        }
      );
    } else {
      this.dialogMessage = 'Please fill in all required fields.';
      this.showDialog = true;
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  closeRedirectionDialog() {
    this.showRedirectionDialog = false;
  }
}
