import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buy-screen',
  templateUrl: './buy-screen.component.html',
  styleUrl: './buy-screen.component.scss'
})
export class BuyScreenComponent {
  order: Order | null = null;
  buyForm: FormGroup;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private orderService: OrderService, private router: Router) { 
    this.buyForm = this.formBuilder.group({
      hour: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.orderService.getOrder(id).subscribe(
        (data: Order | null) => {
          this.order = data;
        },
        error => {
          this.router.navigate(['/cart']);
        }
      );
    });
  }

  onSubmit() {
    this.route.params.subscribe(params => {
      if (this.buyForm.valid) {
        const formData = { ...this.buyForm.value };
        const id = +params['id'];
        this.orderService.buyOrder(id,formData).subscribe(
          () => {
            this.dialogMessage = 'Completed purchase!';
            this.showRedirectionDialog = true;
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
    });
  }

  closeDialog() {
    this.showDialog = false;
  }

  closeRedirectionDialog() {
    this.showRedirectionDialog = false;
  }
}
