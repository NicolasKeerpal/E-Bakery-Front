import { Component, Input } from '@angular/core';
import { Food } from '../../models/food';


@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {
  @Input() food!: Food;

  onImageError(event: any) {
    event.target.src = '../../../assets/no_image_available.png';
  }
}
