import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../../../admin/services/car.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-book-car',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})


export class BookCarComponent implements OnInit {
  selectedCar: Car | null = null;

  totalPrice: number = 0;
  booking = {
    carId: '',
    userName: '',
    email: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    dropoffTime: '',
    aadharFile: '',
    licenseFile: '',
    status: 'Confirmed'
  };
  message = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadBookings();
    const carId = this.route.snapshot.paramMap.get('id');

    if (carId) {
      this.http.get<Car[]>('http://localhost:3000/cars').subscribe((data) => {
        this.selectedCar = data.find(car => car?.id?.toString() === carId) || null;

        if (this.selectedCar?.id) {
          this.booking.carId = this.selectedCar.id.toString();
        }
      });
    }

  }

  calculateTotalPrice() {
    if (!this.selectedCar || !this.booking.pickupDate || !this.booking.returnDate) {
      this.totalPrice = 0;
      return;
    }

    const pickup = new Date(this.booking.pickupDate);
    const returnDate = new Date(this.booking.returnDate);

    if (returnDate < pickup) {
      this.message = "Return date must be after pickup date!";
      this.totalPrice = 0;
      return;
    }

    const diffTime = returnDate.getTime() - pickup.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    this.totalPrice = diffDays * this.selectedCar.price;
  }


  // calculateTotalPrice() {
  //   if (!this.selectedCar || !this.booking.pickupDate || !this.booking.returnDate) {
  //     this.totalPrice = 0;
  //     return;
  //   }

  //   const pickup = new Date(this.booking.pickupDate);
  //   const returnDate = new Date(this.booking.returnDate);

  //   console.log("Pickup Date:", pickup);
  //   console.log("Return Date:", returnDate);

  //   if (isNaN(pickup.getTime()) || isNaN(returnDate.getTime())) {
  //     this.message = "Invalid date selection!";
  //     this.totalPrice = 0;
  //     return;
  //   }

  //   if (returnDate < pickup) {
  //     this.message = "Return date must be after pickup date!";
  //     this.totalPrice = 0;
  //     return;
  //   }

  //   const diffTime = returnDate.getTime() - pickup.getTime();
  //   const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  //   console.log("Difference in Time (ms):", diffTime);
  //   console.log("Difference in Days:", diffDays);
  //   console.log("Selected Car:", this.selectedCar);
  //   console.log("Selected Car Price:", this.selectedCar?.price);

  //   this.totalPrice = diffDays * this.selectedCar.price;
  // }


  bookCar() {
    if (!this.booking.pickupDate || !this.booking.returnDate) {
      this.message = "Please select pickup and return dates!";
      return;
    }

    const newBooking = {
      id: Math.random().toString(16).slice(2),
      userId: "f454",
      carId: this.booking.carId,
      carDetails: this.selectedCar
        ? `${this.selectedCar.brand} - ${this.selectedCar.name} (₹${this.selectedCar.price}/day)`
        : '',
      carImage: this.selectedCar ? this.selectedCar.img : '/images/placeholder.jpg',
      userName: this.booking.userName,
      email: this.booking.email,
      pickupDate: this.booking.pickupDate,
      pickupTime: this.booking.pickupTime,
      returnDate: this.booking.returnDate,
      dropoffTime: this.booking.dropoffTime,
      totalPrice: this.totalPrice,
      aadharFile: this.booking.aadharFile || '',
      licenseFile: this.booking.licenseFile || '',
      status: "Pending",

    };


    // console.log("Booking Details Submitted:", newBooking);
    // this.http.post('http://localhost:3000/bookings', newBooking).subscribe(() => {
    //   this.message = `Booking request sent successfully! Redirecting to My Bookings...`;
    //   setTimeout(() => {
    //     console.log("Redirecting to My Bookings...");
    //     this.router.navigate(['/customer/my_bookings']);
    //   }, 2000);
    // });
    console.log("Booking Details Submitted:", newBooking);
    this.http.post('http://localhost:3000/bookings', newBooking).subscribe(() => {
      this.message = `Booking request sent successfully! Redirecting to My Bookings...`;
      setTimeout(() => {
        console.log("Redirecting to My Bookings...");
        this.router.navigate(['/customer/my_bookings']);
      }, 2000);
    });
  }


  // handleFileUpload(event: any, fileType: string) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (fileType === 'aadhar') {
  //       this.booking.aadharFile = file;
  //     } else if (fileType === 'license') {
  //       this.booking.licenseFile = file;
  //     }
  //   }
  // }

  handleFileUpload(event: Event, carId: string, fileType: string) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;

    console.log(`Uploading ${fileType} file:`, file.name);

    // Simulated file path
    const fakeUploadedFilePath = `uploads/${file.name}`;

    if (fileType === 'aadhar') {
      this.booking.aadharFile = fakeUploadedFilePath;
    } else if (fileType === 'license') {
      this.booking.licenseFile = fakeUploadedFilePath;
    }

    // Send update request
    this.http.patch(`http://localhost:3000/bookings/${carId}`, {
      [fileType === 'aadhar' ? 'aadharFile' : 'licenseFile']: fakeUploadedFilePath
    }).subscribe(
      () => console.log(`Updated booking with ${fileType}: ${fakeUploadedFilePath}`),
      (error) => console.error(`Error updating ${fileType} file:`, error)
    );
  }



  loadBookings() {
    this.http.get<any[]>('http://localhost:3000/bookings').subscribe(
      (data) => {
        const userBooking = data.find(b => b.email === this.booking.email);
        if (userBooking) {
          this.booking.aadharFile = userBooking.aadharFile;
          this.booking.licenseFile = userBooking.licenseFile;
        }
      },
      (error) => console.error("Error loading bookings:", error)
    );
  }




}

