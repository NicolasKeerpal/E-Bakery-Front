import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PopulateDbComponent } from '../../components/populate-db/populate-db.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: PopulateDbComponent },
];

@NgModule({
  declarations: [
    PopulateDbComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PopulateDbModule { }
