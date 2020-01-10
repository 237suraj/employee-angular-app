import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  employee: Employee
  constructor(private _employeeService: EmployeeService, private _router: Router) { 
    this.employee = _employeeService.currentUserValue;
  }

  ngOnInit() {
  }

  onLogout(){
    this._employeeService.logout()
    // this._router.navigate(['/'])
  }
}
