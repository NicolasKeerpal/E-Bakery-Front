import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientsListComponent } from '../../components/ingredients-list/ingredients-list.component';
import { AddIngredientComponent } from '../../components/add-ingredient/add-ingredient.component';
import { UpdateIngredientComponent } from '../../components/update-ingredient/update-ingredient.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: IngredientsListComponent },
  { path: 'add', component: AddIngredientComponent },
  { path: ':id/edit', component: UpdateIngredientComponent }
];

@NgModule({
  declarations: [
    IngredientsListComponent,
    AddIngredientComponent,
    UpdateIngredientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class IngredientsModule { }
