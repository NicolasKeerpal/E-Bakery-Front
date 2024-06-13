import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirection-dialog',
  templateUrl: './redirection-dialog.component.html',
  styleUrl: './redirection-dialog.component.scss'
})
export class RedirectionDialogComponent {
  @Input() message: string = '';
  @Input() showRedirectionDialog: boolean = false;
  @Input() redirectUrl: string = '';
  @Output() closeRedirectionDialog = new EventEmitter<void>();

  constructor(private router: Router) {}
  
  close() {
    this.closeRedirectionDialog.emit();
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    }
  }
}
