import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterComponent {
  userData = {
    rol_id: 2, // ver si esta cosa era de verdad 2
    nombre: '',
    apellido: '',
    sexo: '',
    telefono: '',
    contrasena: '',
    username: '',
    email: '',
    edad: null
  };

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // manejar quiza sweet alert o algo de la pract depende de las ganas que me den 
        alert('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        // manejar quiza sweet alert o algo de la pract
      }
    });
  }
}