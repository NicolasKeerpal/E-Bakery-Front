import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  showDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
      role: ['customer', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        (response: any) => {
          if (response.success) {
            const token = response.token;
            this.authService.setToken(token);
            this.router.navigate(['/']);
          } else {
            this.dialogMessage = 'Login failed, please try again.';
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
}
