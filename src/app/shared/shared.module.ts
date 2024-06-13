import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../components/dialog/dialog.component';
import { RedirectionDialogComponent } from '../components/redirection-dialog/redirection-dialog.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

@NgModule({
  declarations: [
    DialogComponent,
    RedirectionDialogComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DialogComponent,
    RedirectionDialogComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
