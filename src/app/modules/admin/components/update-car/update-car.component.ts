import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../../services/car.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  standalone: true,
  selector: 'app-update-car',
  imports: [ReactiveFormsModule, NzDatePickerModule, NzSelectModule, NzIconModule, CommonModule, RouterModule, NzSpinModule, NzFormModule, NzButtonModule, NzInputModule, NzLayoutModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent {

  selectedFile: File | null = null;  // Holds new selected image file
  imagePreview: string | ArrayBuffer | null | undefined = null;  // Holds new image preview
  existingImage: string = ''; // Holds the existing image URL
  carId!: string;
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  updateForm !: FormGroup;
  listOfOption: Array<{ label: string, value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "KIA", "MARUTI SUZUKI"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Black", "Blue", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Electric"];
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    })
    this.activatedRoute.paramMap.subscribe(params => {
      this.carId = params.get("id") || "";
      console.log("Car ID:", this.carId);
      this.getCarById();
    });
  }

  updateCar() {
    if (this.updateForm.valid) {
      const updatedCarData = this.updateForm.value;
      if (!updatedCarData.img && this.existingImage) {
        updatedCarData.img = this.existingImage.replace('/images/', '');
      }
      this.carService.updateCar(this.carId, updatedCarData).subscribe(res => {
        console.log("Car updated successfully:", res);
        this.getCarById();
      }, error => {
        console.error("Update failed:", error);
      });
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

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.existingImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  // submitForm() {
  //   if (this.updateForm.valid) {
  //     const updatedCar = this.updateForm.value;

  //     if (!this.selectedFile && this.existingImage) {
  //       updatedCar.img = this.existingImage.replace('/images/', '');
  //     }

  //     this.carService.updateCar(this.carId, updatedCar).subscribe(
  //       (res) => {
  //         console.log('Car updated successfully:', res);
  //         alert('Car updated successfully!');

  //         localStorage.setItem(`carImage-${this.carId}`, updatedCar.img);

  //         this.getCarById();

  //         setTimeout(() => {
  //           this.router.navigate(['/admin/dashboard']);
  //         }, 500);
  //       },
  //       (err) => {
  //         console.error('Error updating car:', err);
  //       }
  //     );
  //   } else {
  //     alert('Please fill all required fields.');
  //   }
  // }

  submitForm() {
    if (this.updateForm.valid) {
      const updatedCar = { ...this.updateForm.value };
  
      if (!this.selectedFile && this.existingImage) {
        updatedCar.img = this.existingImage.replace('/images/', '');
      }
  
      this.carService.updateCar(this.carId, updatedCar).subscribe(
        (res) => {
          console.log('Car updated successfully:', res);
          // alert('Car updated successfully!');
  
          this.existingImage = `/images/${updatedCar.img}`;
  
          this.updateForm.patchValue(updatedCar);
  
          localStorage.setItem(`carImage-${this.carId}`, this.existingImage);
  
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 500);
        },
        (err) => {
          console.error('Error updating car:', err);
        }
      );
    } else {
      alert('Please fill all required fields.');
    }
  }
  
  // getCarById() {
  //   this.carService.getCarById(this.carId).subscribe(res => {
  //     console.log("Car Details:", res);

  //     const storedImage = localStorage.getItem(`carImage-${this.carId}`);

  //     this.existingImage = storedImage
  //       ? `/images/${storedImage}`
  //       : (res.img ? `/images/${res.img}` : '/images/default.jpg');

  //     console.log("Final Image Path:", this.existingImage);
  //   });
  // }
  getCarById() {
    this.carService.getCarById(this.carId).subscribe(res => {
      console.log("Car Details:", res);
  
      this.updateForm.patchValue(res);
  
      const storedImage = localStorage.getItem(`carImage-${this.carId}`);
      this.existingImage = storedImage ? storedImage : `/images/${res.img}`;
    });
  }
  

}
