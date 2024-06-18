import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Food } from '../../models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  food: Food | null = null;
  userRole: string | null = null;
  addNumber: number = 1;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';
  redirectUrl: string = '/cart';

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.foodService.getFood(id).subscribe(
        (data: Food | null) => {
          this.food = data;
        },
        error => {
          this.food = null;
        }
      );
    });
  }

  addNb(): void {
    if (this.addNumber != 100) {
      this.addNumber++;
    }
  }

  delNb(): void {
    if (this.addNumber != 1) {
      this.addNumber--;
    }
  }

  addCart(): void {
    let data;
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      data = {
        foodId: id,
        qty: this.addNumber
      }
    });

    this.orderService.addOrder(data).subscribe(
      (response: any) => {
        if (response.success) {
          this.dialogMessage = 'This food was added successfully in your cart !';
          this.showRedirectionDialog = true;
        } else {
          this.dialogMessage = 'Adding failed, please try again.';
          this.showDialog = true;
        }
      },
      (error: any) => {
        this.dialogMessage = error.message;
        this.showDialog = true;
      }
    );
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  closeRedirectionDialog(): void {
    this.showRedirectionDialog = false;
  }

  deleteProduct(id: number): void {
    this.foodService.delFood(id).subscribe(
      () => {
        this.dialogMessage = "Product was deleted succesfully !";
        this.redirectUrl = '/our-products';
        this.showRedirectionDialog = true;
      },
      error => {
        this.dialogMessage = error.message;
        this.showDialog = true;
      }
    );
  }
}
