import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importar ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciertosService } from '../../../Services/Conciertos.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetallesPage implements OnInit {
  concierto: any = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conciertosService: ConciertosService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.conciertosService.getConciertoById(+id).subscribe({
        next: (data) => {
          this.concierto = data;
          console.log('Detalles del concierto:', this.concierto);
          console.log('Viajes:', this.concierto.viajes); 
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('Error al cargar los detalles del concierto:', err);
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

  irASeleccionAsiento(viajeId: number) {
  this.router.navigate(['/views/Asientos', viajeId]);
}
}