import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveriesListComponent } from '../../components/deliveries-list/deliveries-list.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: DeliveriesListComponent },
];

@NgModule({
  declarations: [
    DeliveriesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DeliveriesModule { }
