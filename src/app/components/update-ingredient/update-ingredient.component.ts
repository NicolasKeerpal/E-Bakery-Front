import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/ingredient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styleUrl: './update-ingredient.component.scss'
})
export class UpdateIngredientComponent {
  ingredient: Ingredient | null = null;
  ingredientForm: FormGroup;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private ingredientService: IngredientService) {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      addStock: ['', [Validators.min(0), Validators.max(500), Validators.pattern(/^-?\d+$/)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.ingredientService.getIngredient(id).subscribe(
        (data: Ingredient | null) => {
          this.ingredient = data;
          if (this.ingredient) {
            this.ingredientForm.patchValue({
              name: this.ingredient.name,
              addStock: 0 
            });
          }
        },
        error => {
          this.ingredient = null;
        }
      );
    });
  }

  onSubmit() {
    this.route.params.subscribe(params => {
      if (this.ingredientForm.valid) {
        const formData = { ...this.ingredientForm.value };
        const id = +params['id']; 
        formData.addStock = parseInt(formData.addStock, 10);
        this.ingredientService.putIngredient(id,formData).subscribe(
          () => {
            this.dialogMessage = 'Your ingredient was modified successfully!';
            this.showRedirectionDialog = true;
          },
          (error: any) => {
            this.dialogMessage = error.message;
            this.showDialog = true;
          }
        );
      } else {
        this.ingredientForm.markAllAsTouched();
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
