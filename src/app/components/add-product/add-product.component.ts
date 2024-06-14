import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  ingredients: Ingredient[] = [];
  composition: Ingredient[] = [];
  selectedIngredientIndex: number = 0;
  productForm: FormGroup;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';
  selectedImage: File | null = null;
  foodId: number = 0;

  constructor(private formBuilder: FormBuilder, private foodService: FoodService, private ingredientService: IngredientService) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
      },
      error => {
        this.ingredients = [];
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0]; 
  }

  onSubmit() {
    if (this.productForm.valid && this.composition.length>0 && this.selectedImage) {
      this.foodService.addFood(this.productForm.value, this.selectedImage).subscribe(
        (response: any) => {
          console.log(response);
          this.foodId = response.food.id;
          this.foodService.addCompositions(this.foodId, this.composition).subscribe(
            () => {
              this.dialogMessage = 'Your product was added successfully!';
              this.showRedirectionDialog = true;
            },
            (error: any) => {
              this.dialogMessage = 'Adding compositions failed, please try again.';
              this.showDialog = true;
            }
          );
        },
        (error: any) => {
          this.dialogMessage = 'Adding product failed, please try again.';
          this.showDialog = true;
        }
      );
    } else {
      if (!this.productForm.valid) {
        this.dialogMessage = 'Please fill in all required fields.';
        this.showDialog = true;
      } else {
        this.dialogMessage = 'You must have at least 1 ingredient in your composition.';
        this.showDialog = true;
      }
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  closeRedirectionDialog() {
    this.showRedirectionDialog = false;
  }

  addComposition() {
    const ingredientToAdd = this.ingredients[this.selectedIngredientIndex];

    const isAlreadyAdded = this.composition.some(ingredient => ingredient.id === ingredientToAdd.id);
  
    if (!isAlreadyAdded) {
      this.composition.push(ingredientToAdd);
    } else {
      this.dialogMessage = 'This ingredient is already in the composition';
      this.showDialog = true;
    }
  }

  delComposition(id: number) {
    this.composition = this.composition.filter(ingredient => ingredient.id !== id);
  }
}
