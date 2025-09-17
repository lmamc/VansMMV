import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AsientosService } from '../../../Services/Asientos.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.page.html',
  styleUrls: ['./asientos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AsientosPage implements OnInit {
  asientos: any[] = [];
  viajeId!: number;
  asientoSeleccionado!: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private asientoService: AsientosService
  ) {}

  ngOnInit() {
    this.viajeId = Number(this.route.snapshot.paramMap.get('viajeId'));
    this.cargarAsientos();
  }

  cargarAsientos() {
    this.http
      .get(`http://localhost:8080/viajes/${this.viajeId}/asientos`)
      .subscribe((data: any) => {
        this.asientos = (data as any[]).map((a) => ({
          ...a,
          seleccionado: false,
        }));
        console.log('Asientos cargados:', this.asientos);
      });
  }

  seleccionarAsiento(asiento: any) {
    if (asiento.estado === 'disponible') {
      this.asientos.forEach((a) => (a.seleccionado = false));
      asiento.seleccionado = true;
      this.asientoSeleccionado = asiento;
    }
  }

  reservarAsiento() {
    if (!this.asientoSeleccionado) return;
    const token = localStorage.getItem('jwtToken');
    let usuario_id = null;
    if (token) {
      const decoded: any = jwtDecode(token);
      usuario_id = decoded.usuario_id;
    }
    const reserva = {
      usuario_id,
      viaje_id: this.viajeId,
      asiento_id: this.asientoSeleccionado.asiento_id,
      fecha_reserva: new Date().toISOString(),
      estado: 'Reservado',
    };
    this.http.post('http://localhost:8080/reservas', reserva).subscribe(() => {
      this.cargarAsientos();
      this.asientoSeleccionado = null;
    });
  }
}
