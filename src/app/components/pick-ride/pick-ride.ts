import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddRide } from '../add-ride/add-ride';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-ride',
  imports: [CommonModule, AddRide, FormsModule],
  templateUrl: './pick-ride.html',
  styleUrl: './pick-ride.css',
  standalone: true
})
export class PickRide {
  showAddRide: boolean = false;

  constructor(private router: Router) {
    const storedRides = sessionStorage.getItem('rides');
    if (storedRides) {
      const allRides = JSON.parse(storedRides);
      const today = new Date().toISOString().split('T')[0];
      this.rideList = allRides.filter((r: any) => r.date === today);
    }
    const loggedInEmpId = sessionStorage.getItem('employeeId');
    if (loggedInEmpId) {
      this.employeeIdForBooking = loggedInEmpId;
    }
  }

  rideList: any[] = [];
  employeeIdForBooking = '';
  vehicleFilter = '';
  message: string = '';
  bookingTime = '';

  ngOnInit(): void {
    if (history.state.showAddRide !== undefined) {
      this.showAddRide = history.state.showAddRide;
    }
  }

  addedRide(val: any) {
    console.log(val)
    this.rideList.push(val)
  }

  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  get filteredRides() {
    const today = new Date().toISOString().split('T')[0];

    console.log(this.vehicleFilter)
    let rides = this.rideList.filter(r => r.date === today);

    // Filter by vehicle type
    if (this.vehicleFilter) {
      rides = rides.filter(r => r.vehicleType === this.vehicleFilter);
    }

    // if (this.employeeIdForBooking && this.employeeIdForBooking.trim() !== '') {
    //   rides = rides.filter(r => r.employeeId
    //     .toLowerCase()
    //     .includes(this.employeeIdForBooking.toLowerCase().trim()));
    // }

    // if (this.employeeIdForBooking === '')
    //   this.message = ''

    // // 🕒 Filter by booking time ±60 minutes
    if (this.bookingTime) {
      const selectedTime = this.convertToMinutes(this.bookingTime);
      rides = rides.filter(r => {
        const rideTime = this.convertToMinutes(r.time);
        const diff = Math.abs(rideTime - selectedTime);
        return diff <= 60; // within ±60 minutes
      });
    }

    return rides
  }


  bookRide(ride: any) {
    console.log(ride.employeeId, this.employeeIdForBooking)
    this.message = '';

    if (!this.employeeIdForBooking) {
      this.message = 'Employee not logged in.';
      return;
    }

    // Cannot book own ride
    if (ride.employeeId === this.employeeIdForBooking) {
      this.message = 'You cannot book your own ride.';
      return;
    }

    //  Cannot book the same ride twice
    if (ride.bookedEmployees.includes(this.employeeIdForBooking)) {
      this.message = 'You have already booked this ride.';
      return;
    }

    // Cannot book if no vacant seats
    if (ride.vacantSeats <= 0) {
      this.message = 'No vacant seats left for this ride.';
      return;
    }

    // Book the ride
    ride.vacantSeats--;
    ride.bookedEmployees.push(this.employeeIdForBooking);

    // Update rides in sessionStorage
    sessionStorage.setItem('rides', JSON.stringify(this.rideList));

    // Show success message
    this.message = 'Ride booked successfully!';
  }

  navigateHome() {
    this.router.navigate(['./home'])
  }

  clearTimeFilter() {
    this.bookingTime = ''; // clears the selected time and resets the filter
  }


}
