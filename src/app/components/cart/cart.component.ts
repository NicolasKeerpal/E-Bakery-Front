import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FoodService } from '../../services/food.service';
import { Order } from '../../models/order';
import { Food } from '../../models/food';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  orders: Order[] = [];
  foods: Food[] = [];
  displayedOrders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalItems: number = 0;
  showDialog: boolean = false;
  dialogMessage: string = '';

  constructor(
    private foodService: FoodService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      (data: Food[]) => {
        this.foods = data;
      },
      error => {
        this.foods = [];
      }
    );

    this.loadOrders();
  }

  getFoodName(id: number): string {
    return this.foods[id].name;
  }

  getFoodPrice(id: number): number {
    return this.foods[id].price;
  }

  loadOrders(): void {
    this.orderService.getCart().subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.displayedOrders = data;
        this.totalItems = data.length;
      },
      error => {
        this.orders = [];
      }
    );
  }

  get paginatedOrders(): Order[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.displayedOrders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
    }
  }

  deleteOrder(id: number): void {
    this.orderService.delOrder(id).subscribe(
      () => {
        this.dialogMessage = "Order was deleted succesfully !";
        this.showDialog = true;
        this.loadOrders();
      },
      error => {
        this.dialogMessage = error.message;
        this.showDialog = true;
      }
    );
  }

  closeDialog() {
    this.showDialog = false;
  }
}
