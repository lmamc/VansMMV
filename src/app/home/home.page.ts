import { Component, OnInit } from '@angular/core';

import { ConciertosService } from '../../Services/Conciertos.service'; 
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink], 
})
export class HomePage implements OnInit {
  conciertos: any[] = [];

  constructor(
    private conciertosService: ConciertosService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarConciertos();
  }

  cargarConciertos() {
    this.conciertosService.getConciertos().subscribe({
      next: (data) => {
        this.conciertos = data;
        console.log('Conciertos cargados:', this.conciertos);
      },
      error: (err) => {
        console.error('Error al cargar conciertos:', err);
        // Aquí podrías manejar errores, como token inválido o problemas de red
      }
    });
  }

  // Función para manejar el clic en un concierto
  verDetalleConcierto(conciertoId: number) {
    // Navegar a una futura página de detalles del concierto
    console.log('Navegando al detalle del concierto:', conciertoId);
    // this.router.navigate(['/concierto', conciertoId]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    // Opcional: limpiar otros datos relacionados a la sesión si los hubiera
  }
}