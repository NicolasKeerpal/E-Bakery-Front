import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { CustomerService } from '../../services/customer.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrl: './update-profil.component.scss'
})
export class UpdateProfilComponent {
  userRole: string | null = null;
  customer: Customer | null = null;
  employee: Employee | null = null;
  profilForm: FormGroup;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private customerService: CustomerService, private employeeService: EmployeeService) {
    this.profilForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: [''],
      firstname: ['', Validators.required], 
      lastname: ['', Validators.required], 
      town: ['', Validators.required], 
      zipCode: ['', Validators.required], 
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userRole = this.authService.getRole();

    if (this.userRole=='customer') {
      this.customerService.getCustomer(this.authService.getId()).subscribe(
        (data: Customer | null) => {
          this.customer = data;
          this.profilForm.removeControl('firstname');
          this.profilForm.removeControl('lastname');

          if (this.customer!=null) {
            this.profilForm.patchValue({
              mail: this.customer.mail,
              town: this.customer.town,
              address: this.customer.address,
              zipCode: this.customer.zipCode
            });
          }

        },
        error => {
          this.router.navigate(['/']);
        }
      );
    } else {
      this.employeeService.getEmployee(this.authService.getId()).subscribe(
        (data: Employee | null) => {
          this.employee = data;
          this.profilForm.removeControl('town');
          this.profilForm.removeControl('address');
          this.profilForm.removeControl('zipCode');

          if (this.userRole=='admin') {
            if (this.employee!=null) {
              this.profilForm.patchValue({
                firstname: this.employee.firstname,
                lastname: this.employee.lastname,
                mail: this.employee.mail
              });
            }
          } else {
            this.profilForm.removeControl('firstname');
            this.profilForm.removeControl('lastname');
            if (this.employee!=null) {
              this.profilForm.patchValue({
                mail: this.employee.mail
              });
            }
          }
        },
        error => {
          this.router.navigate(['/']);
        }
      );
    }
  }

  onSubmit() {
      if (this.profilForm.valid) {
        const formData = { ...this.profilForm.value };

        if (this.userRole=='customer') {
          this.customerService.putCustomer(this.authService.getId(),formData).subscribe(
            () => {
              this.dialogMessage = 'Your profil was modified successfully!';
              this.showRedirectionDialog = true;
            },
            (error: any) => {
              this.dialogMessage = error.message;
              this.showDialog = true;
            }
          );
        } else {
          this.employeeService.putEmployee(this.authService.getId(),formData).subscribe(
            () => {
              this.dialogMessage = 'Your profil was modified successfully!';
              this.showRedirectionDialog = true;
            },
            (error: any) => {
              this.dialogMessage = error.message;
              this.showDialog = true;
            }
          );
        }
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
