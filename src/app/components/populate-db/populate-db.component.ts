import { Component } from '@angular/core';
import { PopulateDbService } from '../../services/populate-db.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-populate-db',
  templateUrl: './populate-db.component.html',
  styleUrl: './populate-db.component.scss'
})
export class PopulateDbComponent {
  showLoadingDialog: boolean = false;
  showDialog: boolean = false;
  showRedirectionDialog: boolean = false;
  dialogMessage: string = '';

  constructor(private populateDbService: PopulateDbService, private authService: AuthService) {}

  onPopulateDB() {
    this.showLoadingDialog = true;

    this.populateDbService.populateDB().subscribe(
      (response: any) => {
        if (response.success) {
          this.showLoadingDialog = false;
          this.dialogMessage = 'Database populated with success ! You will be disconnected';
          this.showRedirectionDialog = true;
          this.authService.clearToken();
        } else {
          this.dialogMessage = 'Populating database failed, please try again.';
          this.showDialog = true;
        }
      },
      (error: any) => {
        this.showLoadingDialog = false;
        this.dialogMessage = error.message;
        this.showDialog = true;
      }
    );
  }

  closeDialog() {
    this.showDialog = false;
  }

  closeRedirectionDialog() {
    this.showRedirectionDialog = false;
  }
}
