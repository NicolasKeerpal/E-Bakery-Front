import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FoodService } from '../../services/food.service';
import { Order } from '../../models/order';
import { Food } from '../../models/food';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  orders: Order[] = [];
  foods: Food[] = [];
  displayedOrders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalItems: number = 0;
  showDialog: boolean = false;
  dialogMessage: string = '';
  isCompleted: boolean = false;

  constructor(
    private foodService: FoodService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      (data: Food[]) => {
        this.foods = data;
        console.log('Products:', this.foods);
      },
      error => {
        console.error('Error loading foods:', error);
        this.foods = [];
      }
    );
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getPaidOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.displayedOrders = data;
        this.totalItems = data.length;
      },
      error => {
        console.error('Error loading orders:', error);
        this.orders = [];
      }
    );
  }

  getFoodName(id: number): string {
    return this.foods.find(food => food.id === id)?.name || '';
  }

  finishOrder(orderId: number): void {
    this.isCompleted = !this.isCompleted;
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

  closeDialog(): void {
    this.showDialog = false;
  }
}
