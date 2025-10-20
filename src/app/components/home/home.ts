import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  loginEmployee: string = ''
  showAddRide: boolean = false;
  employeeId: string = '';
  todaysRides: any[] = [];

  constructor(private router: Router) {
    this.loginEmployee = JSON.parse(sessionStorage.getItem('employeeId') || '');
  }

  ngOnInit(): void {
    // Load logged-in employee ID
    const empId = sessionStorage.getItem('employeeId');
    if (empId) this.employeeId = empId;

    // Load rides from sessionStorage
    const storedRides = sessionStorage.getItem('rides');
    if (storedRides) {
      const allRides = JSON.parse(storedRides);
      const today = new Date().toISOString().split('T')[0];

      // Filter rides for today
      this.todaysRides = allRides.filter((r: any) => r.date === today);
    }
  }

  logout() {
    // sessionStorage.clear(); // clear session
    this.router.navigate(['/']); // navigate to login
  }

  addNewRide() {
    this.router.navigate(['/addNewRide']);
  }

  findRide() {
    this.router.navigate(['/rides'], { state: { showAddRide: false } });

  }
}
