import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { DetailEmployeeComponent } from './components/employee/detail-employee/detail-employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'employee/:id', component: DetailEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
