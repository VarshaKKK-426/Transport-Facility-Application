import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-ride',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-ride.html',
  styleUrl: './add-ride.css',
  standalone: true
})
export class AddRide {
  @Output() rideAdded = new EventEmitter<any>();

  newRide: any = {}
  existingRide: any[] = [];

  constructor(private router: Router) {
    const storedRides = sessionStorage.getItem('rides');
    if (storedRides) {
      this.existingRide = JSON.parse(storedRides);
    }

    const empId = sessionStorage.getItem('employeeId');
    if (empId) {
      this.newRide.employeeId = empId;
    }
  }

  addNewRide() {
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0];
    const ride = {
      ...this.newRide,
      date: today,
      bookedEmployees: []
    }
    // const existingId = this.existingRide.some((r) => r.employeeId === ride.employeeId  && r.date === today)
    // if (existingId) {
    //   alert('Employee already has a ride')
    //   return
    // }
    this.existingRide.push(ride)
    this.rideAdded.emit(ride);
    sessionStorage.setItem('rides', JSON.stringify(this.existingRide));
    console.log(this.newRide, this.existingRide)
    alert('Ride added successfully!');
    this.newRide = {};
  }

  navigateToHome() {
    this.router.navigate(['./home'])
  }
}
