import { Component, Input } from '@angular/core';
import { Food } from '../../models/food';


@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {
  @Input() food!: Food;
}
