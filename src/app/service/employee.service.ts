import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from "./config";
import {map} from 'rxjs/operators'
import { Employee } from '../model/employee';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EmployeeService {
  

  currentUserSubject : BehaviorSubject<Employee>
  currentUser: Observable<Employee>

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue() {
    return this.currentUserSubject.value
  }

  addBusiness(business){
    return this._http.post(Config.admin+'/addBusinessUnit',{name:business})
  }

  getAllBusiness(){
    return this._http.get(Config.admin+'/getAddBusiness')
  }

  addSkill(skill){
    return this._http.post(Config.admin+'/addSkill',{name:skill})
  }

  getAllSkill(){
    return this._http.get(Config.employee+'/getAllSkill')
  }

  addEmployeeSkills(employeeId, skillId){
    return this._http.post(Config.employee+'/addEmployeeSkills',{employeeId, skillId})
  }

  getEmployeeSkills(){
    return this._http.get(Config.employee+'/getEmployeeSkills')
  }

  addEmployee(employee){
    return this._http.post(Config.admin+'/addEmployee',{employee})
  }

  getAllEmployee(){
    return this._http.get(Config.admin+"/getAllEmployee")
  }

  update(employee) {
    return this._http.put(Config.employee+"/update/"+employee.id,{employee})
  }

  deleteEmployee(id){
    return this._http.delete(Config.admin+'/delete/'+id)
  }

  login(username,password){
    return this._http.post<Employee>(Config.employee+"/login",{username: username, password: password})
      .pipe(map(user =>{
        if(user) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
        }
        return user
      }))
  }

  logout(){
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }
}
