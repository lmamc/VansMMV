import { Component, OnInit } from '@angular/core';
import { ConciertosService } from '../../../Services/Conciertos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
})
export class DashboardPage implements OnInit {
  conciertos: any[] = [];

  constructor(private conciertosService: ConciertosService) {}

  ngOnInit() {
    this.conciertosService.getAll().subscribe(data => {
      this.conciertos = data;
    });
  }
}