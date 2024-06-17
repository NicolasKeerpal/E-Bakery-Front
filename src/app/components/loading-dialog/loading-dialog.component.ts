import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrl: './loading-dialog.component.scss'
})
export class LoadingDialogComponent {
  @Input() showLoadingDialog: boolean = false;
}
