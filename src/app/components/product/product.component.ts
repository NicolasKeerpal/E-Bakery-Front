import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  food: Food | null = null;

  constructor(private route: ActivatedRoute, private foodService: FoodService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.foodService.getFood(id).subscribe(
        (data: Food | null) => {
          this.food = data;
        },
        error => {
          this.food = null;
        }
      );
    });
  }
}
