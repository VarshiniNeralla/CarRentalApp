
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule,FormsModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = []; 
  showButtons: boolean = true;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const loggedInUserId = "f454"; 
    setTimeout(() => {
      this.showButtons = false;
    }, 600000); 
    this.http.get<any[]>('http://localhost:3000/bookings').subscribe((data) => {
      this.bookings = data.filter(booking => booking.userId === loggedInUserId);
    });
  }

  cancelBooking(bookingId: string) {

    const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex].status = "Cancelled";
    }

    this.http.patch(`http://localhost:3000/bookings/${bookingId}`, { status: "Cancelled" })
      .subscribe(() => {
        console.log(`Booking ${bookingId} cancelled successfully.`);
      }, error => {
        console.error('Error cancelling booking:', error);
      });
  }
}
