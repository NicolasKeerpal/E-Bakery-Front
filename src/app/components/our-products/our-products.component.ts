import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrl: './our-products.component.scss'
})
export class OurProductsComponent {
  foods: Food[] = [];
  displayedFoods: Food[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalItems: number = 0;
  searchQuery: string = '';
  userRole: string | null = null;

  constructor(private foodService: FoodService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.foodService.getFoods().subscribe(
      (data: Food[]) => {
        this.foods = data;
        this.displayedFoods = data;
        this.totalItems = data.length;
      },
      error => {
        this.foods = [];
      }
    );
  }

  filterFoods(): void {
    this.displayedFoods = this.foods.filter(food => 
      food.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
    this.totalItems = this.displayedFoods.length;
    this.currentPage = 1; 
  }

  get paginatedFoods(): Food[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.displayedFoods.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage(): void {
    console.log('next');
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
  }

  prevPage(): void {
    console.log('prev');
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
    }
  }
}
