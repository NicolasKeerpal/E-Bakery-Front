import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  userRole: string | null = null;
  customer: Customer | null = null;
  employee: Employee | null = null;

  constructor(private authService: AuthService, private customerService: CustomerService, private employeeService: EmployeeService, private router: Router) {}
  
  ngOnInit() {
    this.userRole = this.authService.getRole();

    if (this.userRole=='customer') {
      this.customerService.getCustomer(this.authService.getId()).subscribe(
        (data: Customer | null) => {
          this.customer = data;
        },
        error => {
          this.router.navigate(['/']);
        }
      );
    } else {
      this.employeeService.getEmployee(this.authService.getId()).subscribe(
        (data: Employee | null) => {
          this.employee = data;
        },
        error => {
          this.router.navigate(['/']);
        }
      );
    }
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/']);
  }
}
