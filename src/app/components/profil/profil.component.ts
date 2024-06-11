import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.clearToken();
    this.router.navigate(['/']);
  }
}
