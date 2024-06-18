import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthByRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    const userRole: string | null = this.authService.getRole();

    if (this.authService.isConnected() && expectedRoles.includes(userRole ? userRole : 'none')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
