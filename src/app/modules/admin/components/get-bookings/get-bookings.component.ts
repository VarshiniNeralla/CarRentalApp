import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-get-bookings',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.css'
})
export class GetBookingsComponent {
  bookings: any[] = [];
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loadBookings();
  }

  getNumberOfDays(pickupDate: string, returnDate: string): number {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }

  loadBookings() {
    this.http.get<any[]>(`${environment.apiUrl}/bookings`).subscribe((data) => {
      this.bookings = data.map(booking => ({
        ...booking,
        aadharFile: booking.aadharFile ? `${environment.apiUrl.replace('/api', '')}/${booking.aadharFile}` : null,
        licenseFile: booking.licenseFile ? `${environment.apiUrl.replace('/api', '')}/${booking.licenseFile}` : null
      }));
    });
  }

  acceptBooking(bookingId: string) {
    this.http.patch(`${environment.apiUrl}/bookings/${bookingId}`, { status: 'Confirmed' }).subscribe(() => {
      this.bookings = this.bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'Confirmed By Admin' } : booking
      );
    });
  }

  declineBooking(bookingId: string) {
    this.http.patch(`${environment.apiUrl}/bookings/${bookingId}`, { status: 'Cancelled' }).subscribe(() => {
      this.bookings = this.bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'Cancelled By Admin' } : booking
      );
    });
  }

  

}
