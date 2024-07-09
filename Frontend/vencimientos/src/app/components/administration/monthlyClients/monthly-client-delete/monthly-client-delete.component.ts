import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';

@Component({
  selector: 'app-monthly-client-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly-client-delete.component.html',
  styleUrl: './monthly-client-delete.component.css'
})
export class MonthlyClientDeleteComponent implements OnInit{

  @Input() monthlyClient!: MonthlyClient;

  constructor(

  ) {

  }

  ngOnInit(): void {
  }

}
