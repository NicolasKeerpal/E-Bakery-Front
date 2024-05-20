import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrl: './our-products.component.scss'
})
export class OurProductsComponent {
  foods: Food[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      (data: Food[]) => {
        this.foods = data;
        console.log('foods : ', this.foods); 
      },
      error => {
        console.error('Erreur lors de la récupération des aliments', error);
      }
    );
  }
}
