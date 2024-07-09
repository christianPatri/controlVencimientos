import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';

@Component({
  selector: 'app-monthly-vehicle-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly-vehicle-delete.component.html',
  styleUrl: './monthly-vehicle-delete.component.css'
})
export class MonthlyVehicleDeleteComponent implements OnInit{

  @Input() vehicle!: MonthlyVehicle;

  constructor(

  ) {

  }

  ngOnInit(): void {
  }

}
