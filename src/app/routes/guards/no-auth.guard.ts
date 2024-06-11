import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class noAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isConnected()) {
      this.router.navigate(['/profil']);
      return false;
    } else {
      return true;
    }
  }
}