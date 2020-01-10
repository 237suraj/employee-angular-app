import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addForm: FormGroup
  added = false
  loading = false
  isAdd = true
  units = []
  error = ''

  @Output() closePopUp=new EventEmitter();


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _employeeService: EmployeeService
  ) {
    this.units = [
      { id: 1, name:"PES-JAVA"},  
      { id: 2, name:"PES-MICROSOFT"}  
    ]
  }

  ngOnInit() {
    this.addForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      businessunit: ['', Validators.required]
    })
  }

  get f() { return this.addForm.controls}

  onAdd(){
    this.added = true
    if(this.addForm.invalid) return
    this.loading = true
    if(this.addForm.valid){
      console.log("valid")
      this._employeeService.addEmployee({
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        email: this.f.email.value,
        password: this.f.password.value,
        businessunit: this.f.businessunit.value,
      })    
      .pipe().subscribe( data =>{
        if(data)
        this._router.navigate(['/home'])
        else {
          this.loading = false
          this.error = "Invalid username and password"
        }
      }, err => {
        this.error = "Server problem"
        this.loading = false
      })
    }
  }

  onCancel(){
    this.added = false
    this.loading = false
    this.addForm.reset()
  }

  close(){
    this.added = false
    this.loading = false
    this.isAdd = false
    this.closePopUp.emit(this.isAdd);
  }


}
