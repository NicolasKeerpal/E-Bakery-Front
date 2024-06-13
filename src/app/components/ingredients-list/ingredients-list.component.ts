import { Component } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss'
})
export class IngredientsListComponent {
  ingredients: Ingredient[] = [];
  displayedIngredients: Ingredient[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalItems: number = 0;
  searchQuery: string = '';
  showDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
        this.displayedIngredients = data;
        this.totalItems = data.length;
      },
      error => {
        this.ingredients = [];
      }
    );
  }

  filterIngredients(): void {
    this.displayedIngredients = this.ingredients.filter(ingredient => 
      ingredient.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
    this.totalItems = this.displayedIngredients.length;
    this.currentPage = 1; 
  }

  get paginatedIngredients(): Ingredient[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.displayedIngredients.slice(startIndex, startIndex + this.itemsPerPage);
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

  deleteIngredient(id: number): void {
    this.ingredientService.delIngredient(id).subscribe(
      () => {
        this.dialogMessage = "Ingredient was deleted succesfully !";
        this.showDialog = true;
        this.loadIngredients();
        this.searchQuery = '';
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
