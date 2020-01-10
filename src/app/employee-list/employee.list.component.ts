import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee.list.component.html',
  styleUrls: ['./employee.list.component.css']
})
export class EmployeeListComponent implements OnInit {

  isAdd: boolean=false
  _selectedEmployee: Employee
  employeeList
  business = ""
  skill = ""
  bsub = false
  bvalid = false
  ssub = false
  svalid = false
  constructor(private _employeeService: EmployeeService,private dialog: MatDialog) {
    
  }

  ngOnInit() {
    this.isAdd = false;
    this._employeeService.getAllEmployee().subscribe(data=> this.employeeList = data)
  }

  
  confirmDialog(employee) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      position: {left: "35%", top: "0"},
      maxWidth: '400px',
      data: 'Are you sure you want to do this?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this._employeeService.deleteEmployee(employee.id).subscribe(result=>{
          if(result){
            
          }
        })
      }
    });
  }

  addBusiness(){
    this.bsub = true
    if(this.business == "") {
      this.bvalid = true
      return
    }
    else{
      this._employeeService.addBusiness(this.business)
      .subscribe(data=>{
        if(data) console.log("success")
        else console.log("fail")
      })
    }
  }

  addSkill(){
    this.ssub = true
    if(this.skill == "") {
      this.svalid = true
      return
    }
    else{
      this._employeeService.addSkill(this.skill)
      .subscribe(data=>{
        if(data) console.log("success")
        else console.log("fail")
      })
    }
  }

  addNew(){
    this.isAdd = true
  }

  close(value){
    this.isAdd= value;
  }
}
