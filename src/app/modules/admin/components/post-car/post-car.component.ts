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
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Car } from '../../services/car.model';
import { CarService } from '../../services/car.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-post-car',
  imports: [ReactiveFormsModule, NzDatePickerModule, NzSelectModule, NzIconModule, CommonModule, RouterModule, NzSpinModule, NzFormModule, NzButtonModule, NzInputModule, NzLayoutModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;
  listOfOption: Array<{ label: string, value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "KIA", "MARUTI SUZUKI"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Black", "Blue", "Orange", "Grey", "Silver","Yellow"];
  listOfTransmission = ["Manual", "Electric"];

  constructor(private fb: FormBuilder, private router: Router, private carService: CarService, private message: NzMessageService) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]

    })
    this.fetchCars();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file,"hoiii")
      this.selectedFile = file;
      this.previewImage();
    } else {
 
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }
  
  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.log('No file selected');
    }
  }


  postCar() {

    if (!this.selectedFile) {
      alert('Please select an image!');
      return;
    }

    const formData = new FormData();
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('name', this.postCarForm.get('name')?.value);
    formData.append('type', this.postCarForm.get('type')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);
    formData.append('year', this.postCarForm.get('year')?.value);
    formData.append('transmission', this.postCarForm.get('transmission')?.value);
    formData.append('description', this.postCarForm.get('description')?.value);
    formData.append('price', this.postCarForm.get('price')?.value);
    formData.append('img', this.selectedFile);

    const car: Car = {
      brand: this.postCarForm.get('brand')?.value,
      name: this.postCarForm.get('name')?.value,
      type: this.postCarForm.get('type')?.value,
      color: this.postCarForm.get('color')?.value,
      year: this.postCarForm.get('year')?.value,
      transmission: this.postCarForm.get('transmission')?.value,
      description: this.postCarForm.get('description')?.value,
      price: this.postCarForm.get('price')?.value,
      img: this.selectedFile.name
    };

    this.carService.addCar(car).subscribe(response => {
      console.log('Car added successfully:', response);
      this.message.success("Car posted successfully!");
      this.postCarForm.reset();
      this.router.navigateByUrl("/admin/dashboard");
    }, error => {
      console.error('Error adding car:', error);
      alert('Error posting car. Please try again.');
    });
  }

  fetchCars() {
    this.carService.getCars().subscribe(
      (cars) => {
        console.log('Cars:', cars);
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }
}


