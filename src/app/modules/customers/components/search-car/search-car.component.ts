
import {  OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup , Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Car } from '../../../admin/services/car.model';
import { CarService } from '../../../admin/services/car.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [ReactiveFormsModule, NzDatePickerModule, NzSelectModule, NzIconModule, CommonModule, RouterModule, NzSpinModule, NzFormModule, NzButtonModule, NzInputModule, NzLayoutModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.css'
})
export class SearchCarComponent implements OnInit {
  isSpinning:Boolean= false;
  searchedCars: Car[] = [];
  searchCarForm!: FormGroup;
  listOfOption: Array<{ label: string, value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "KIA", "MARUTI SUZUKI"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Black", "Blue", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Electric"];

  constructor(private carService: CarService, private message: NzMessageService,private http: HttpClient,private fb: FormBuilder) {
    this.searchCarForm = this.fb.group({
      brand : [null],
      type: [null],
      transmission : [null],
      color :[null],
      year : [null],
      price : [null]
    })
  }

  ngOnInit() {

  }


  searchCar() {
    this.isSpinning = true;
    const filters = this.searchCarForm.value;
  
    this.carService.searchCars(filters).subscribe(
      (cars) => {
        console.log("Filtered Cars:", cars);
        this.searchedCars = cars; 
        this.isSpinning = false;
      },
      (error) => {
        this.message.error("Failed to fetch car data.");
        this.isSpinning = false;
      }
    );
  }
  


  
}
