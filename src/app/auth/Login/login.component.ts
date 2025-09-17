import { Component } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  contrasena = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = '';
    this.authService
      .login({ username: this.username, contrasena: this.contrasena })
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.error = 'Credenciales inválidas';
        },
      });
  }

  logout() {
    this.authService.logout();
    this.username = '';
    this.contrasena = '';
    this.error = '';
    this.router.navigate(['/home']);
  }
}