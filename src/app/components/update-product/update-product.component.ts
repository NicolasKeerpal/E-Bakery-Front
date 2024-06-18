import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  ingredients: Ingredient[] = [];
  composition: Ingredient[] = [];
  selectedIngredientIndex: number = 0;
  productForm: FormGroup;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';
  selectedImage: File | null = null;
  food: Food | null = null;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private foodService: FoodService, private ingredientService: IngredientService) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      addStock: ['', [Validators.min(0), Validators.max(10000), Validators.pattern(/^-?\d+$/)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
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

    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.foodService.getFood(id).subscribe(
        (data: Food | null) => {
          this.food = data;
          if (this.food) {
            this.productForm.patchValue({
              name: this.food.name,
              addStock: 0,
              price: this.food.price,
              description: this.food.description
            });
          }
        },
        error => {
          this.food = null;
        }
      );
    });
  }

  onSubmit() {
    this.route.params.subscribe(params => { 
      if (this.productForm.valid) { //&& this.composition.length > 0
        const id = +params['id']; 
        this.foodService.putFood(id, this.productForm.value, this.selectedImage).subscribe(
          () => {
            this.dialogMessage = 'Your product was modified successfully!';
            this.showRedirectionDialog = true;
          },
          (error: any) => {
            this.dialogMessage = 'Updating product failed, please try again.';
            this.showDialog = true;
          }
        );
      } else {
        if (!this.productForm.valid) {
          this.productForm.markAllAsTouched();
        } else {
          this.dialogMessage = 'You must have at least 1 ingredient in your composition.';
          this.showDialog = true;
        }
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.dialogMessage = 'The image must be in JPG or PNG format.';
        this.showDialog = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          if (img.width === 314 && img.height === 274) {
            this.selectedImage = file;
          } else {
            this.dialogMessage = 'The image must have a size of 314 x 274 pixels.';
            this.showDialog = true;
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
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
