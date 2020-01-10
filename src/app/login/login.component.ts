import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error = '';

  constructor(
    private _employeeService: EmployeeService,
    private _fb: FormBuilder,
    private _router: Router
  ) { 
    if(this._employeeService.currentUserValue) this._router.navigate(['/home'])
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    })

  }

  get f() { return this.loginForm.controls}

  onSubmit(){
    this.submitted = true
    if(this.loginForm.invalid) return
    this.loading = true;
    this._employeeService.login(this.f.username.value, this.f.password.value)    
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
