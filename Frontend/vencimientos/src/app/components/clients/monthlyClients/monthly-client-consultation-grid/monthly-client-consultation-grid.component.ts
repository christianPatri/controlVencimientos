import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';

@Component({
  selector: 'app-monthly-client-consultation-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly-client-consultation-grid.component.html',
  styleUrl: './monthly-client-consultation-grid.component.css'
})
export class MonthlyClientConsultationGridComponent implements OnInit{


  constructor() {
   }

  ngOnInit(): void {

  }

  @Input() monthlyClient!: MonthlyClient;
}
