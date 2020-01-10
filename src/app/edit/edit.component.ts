import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() selectedEmployee: Employee;

  editForm : FormGroup
  updated = false
  loading = false

  constructor(
    private _employeeService: EmployeeService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.editForm = this._fb.group({
      firstname: ['',Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      businessunit: ['', Validators.required],
      role: ['', Validators.required],
    })
  }

  get f() { return this.editForm.controls}

  onUpdate(){
    this.updated = true
    if(this.editForm.invalid) return
    this.loading = true;
    this._employeeService.update(this.selectedEmployee)
    .subscribe(data=>{
      console.log(data)
    })
  }
}
