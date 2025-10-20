import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  constructor(private router: Router) { }

  employeeId: string = '';

  login() {
    if (this.employeeId.trim() === '') {
      alert('Please enter your Employee ID');
      return;
    }
    sessionStorage.setItem('employeeId', this.employeeId);

    const storedRides = JSON.parse(sessionStorage.getItem('rides') || '[]');
    console.log(storedRides)
    const employeeRide = storedRides.filter((ride: any) => ride.employeeId === this.employeeId);
    console.log(employeeRide)
    if (employeeRide.length > 0) {
      sessionStorage.setItem('employeeRides', JSON.stringify(employeeRide));
      this.router.navigate(['/home']);
    } else {
      alert('Employee ID doesnot exist');
      this.employeeId = ''
      // this.router.navigate(['/home']);
    }
    
  }
}
