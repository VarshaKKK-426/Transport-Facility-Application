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
  isEmployeeIdDisabled : boolean = false;

  constructor(private router: Router) {
    const storedRides = sessionStorage.getItem('rides');
    if (storedRides) {
      this.existingRide = JSON.parse(storedRides);
    }

    const empId = JSON.parse(sessionStorage.getItem('employeeId') || '');
    if (empId) {
      this.newRide.employeeId = empId;
    }
  }
ngOnInit() {
  const storedEmployeeId = JSON.parse(sessionStorage.getItem('employeeId') || '');
  this.newRide.employeeId = storedEmployeeId;

  const storedRides = JSON.parse(sessionStorage.getItem('rides') || '[]');
  const alreadyHasRide = storedRides.some((ride: any) => ride.employeeId === storedEmployeeId);

  this.isEmployeeIdDisabled = !!alreadyHasRide;
}
  addNewRide() {
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0];
    const ride = {
      ...this.newRide,
      date: today,
      bookedEmployees: []
    }
   
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
