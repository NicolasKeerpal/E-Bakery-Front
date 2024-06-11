import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userRole: string | null = null;
  private loginStatusSubscription: Subscription = new Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getRole();
    this.loginStatusSubscription = this.authService.onLoginStatusChange().subscribe(
      (isLoggedIn: boolean) => {
        this.userRole = isLoggedIn ? this.authService.getRole() : null;
      }
    );
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }
  
}
