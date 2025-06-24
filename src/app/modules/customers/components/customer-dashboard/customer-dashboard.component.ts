import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarService } from '../../../admin/services/car.service';
import { Car } from '../../../admin/services/car.model';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:true,
  selector: 'app-customer-dashboard',
  imports: [RouterModule,CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe(
      (res) => {
        this.cars = res;
        console.log('Cars loaded successfully:', this.cars);
      },
      (err) => {
        console.error('Error loading cars:', err);
      }
    );
  }
  
}
