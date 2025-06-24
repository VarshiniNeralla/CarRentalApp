import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Car } from '../../services/car.model';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  cars: Car[] = [];
  isLoading = true;
  constructor(private carService: CarService, private message: NzMessageService) { }

  ngOnInit() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
      console.log(this.cars);
    });
    this.fetchCars();
  }
  fetchCars() {
    this.carService.getCars().subscribe(
      (data) => {
        this.cars = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching cars:', error);
        this.isLoading = false;
      }
    );
  }

  deleteCar(id: any) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).subscribe(() => {
        this.cars = this.cars.filter(car => car.id !== id);
        this.message.success("Car removed succesfully!",{nzDuration : 5000});
      });
    }
  }

  
}
