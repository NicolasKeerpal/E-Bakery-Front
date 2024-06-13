import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.scss'
})
export class AddIngredientComponent {
  ingredientForm: FormGroup;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private formBuilder: FormBuilder, private ingredientService: IngredientService) {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.ingredientForm.valid) {
      const formData = { ...this.ingredientForm.value };
      formData.stock = parseInt(formData.stock, 10);
      this.ingredientService.addIngredient(formData).subscribe(
        (response: any) => {
          if (response.success) {
            this.dialogMessage = 'Your ingredient was added successfully !';
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
    } else {
      this.dialogMessage = 'Please fill in all required fields.';
      this.showDialog = true;
    }
  }

  closeDialog() {
    this.showDialog = false;
  }

  closeRedirectionDialog() {
    this.showRedirectionDialog = false;
  }
}
