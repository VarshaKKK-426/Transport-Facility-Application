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
    const empPattern = /^EMP\d{2,}$/;
    if (!this.employeeId || !empPattern.test(this.employeeId)) {
      this.employeeId = ''
      return;
    }
    sessionStorage.setItem('employeeId', JSON.stringify(this.employeeId));
    this.router.navigate(['/home']);
  }
}
