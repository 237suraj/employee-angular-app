import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee : Employee
  units = []

  constructor(private _employeeService: EmployeeService,private _router: Router ) {
    this.employee = this._employeeService.currentUserValue
    this.units = [
      { id: 1, name:"PES-JAVA"},  
      { id: 2, name:"PES-MICROSOFT"}  
    ]
  }

  ngOnInit() {
  }
}
