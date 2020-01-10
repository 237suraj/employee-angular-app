import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { EmployeeService } from "./employee.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _employeeService: EmployeeService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(localStorage.getItem('currentUser')){
            if (route.data.roles && route.data.roles[this._employeeService.currentUserValue.role] == "User") {
                // role not authorised so redirect to home page
                this._router.navigate(['/']);
                return false
            }
            return true
        }
        this._router.navigate(['/']);
        return false
    }
}
