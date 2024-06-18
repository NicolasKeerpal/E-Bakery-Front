import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Order } from '../../models/order';
import { Food } from '../../models/food';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrl: './deliveries-list.component.scss'
})
export class DeliveriesListComponent {
  orders: Order[] = [];
  foods: Food[] = [];
  customers: Customer[] = [];
  displayedOrders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalItems: number = 0;
  showDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private foodService: FoodService, private orderService: OrderService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      (data: Food[]) => {
        this.foods = data;
      },
      error => {
        this.foods = [];
      }
    );

    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      error => {
        this.customers = [];
      }
    );

    this.loadOrders();
  }

  getFoodName(id: number): string {
    return this.foods[id].name;
  }

  getCustomerName(id: number): string {
    const customer = this.customers[id];
    return customer.firstname + " " + customer.lastname;
  }

  getCustomerAddress(id: number): string {
    const customer = this.customers[id];
    return customer.address + " " + customer.town + ", " + customer.zipCode;
  }

  loadOrders(): void {
    this.orderService.getDeliveries().subscribe(
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

  closeDialog() {
    this.showDialog = false;
  }

  finishOrder(id: number): void {
    this.orderService.finishOrder(id).subscribe(
      () => {
        this.dialogMessage = "Delivery was finished succesfully !";
        this.showDialog = true;
        this.loadOrders();
      },
      error => {
        this.dialogMessage = error.message;
        this.showDialog = true;
      }
    );
  }
}
