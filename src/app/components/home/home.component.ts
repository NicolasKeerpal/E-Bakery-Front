import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  displayedFoods: Food[] = [];
  userRole: string | null = null;

  constructor(private foodService: FoodService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.foodService.getFoods().subscribe(
      (data: Food[]) => {
        this.foods = data;
        this.displayedFoods = data.slice(0, 3);
      },
      error => {
        this.foods = [];
      }
    );
  }
}
