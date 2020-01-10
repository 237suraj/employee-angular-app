import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";


import { AppComponent } from './app.component';
import { EmployeeService } from './service/employee.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard.service';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeListComponent } from './employee-list/employee.list.component';
import { Role } from './service/role';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditComponent } from './edit/edit.component';

const appRoutes: Routes = [
  {path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard], data: {roles: [Role.User,Role.Admin]}},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo:'login', pathMatch: 'full'},
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    EmployeeListComponent,
    ConfirmationDialogComponent,
    AddEmployeeComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [EmployeeService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
