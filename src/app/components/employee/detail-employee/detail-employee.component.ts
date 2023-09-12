import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/modal/employee.modal';
import { EmployeeDataService } from '../employee.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {

  selectedId: number = 0;
  selectedEmployee: Employee = {id: 0, name: ''}
  // @ViewChild('employeeListRef', { static: false }) employeeList: ListEmployeeComponent;

  constructor(private route: ActivatedRoute, private _employeeDataService: EmployeeDataService) {
    // this.employeeList = ListEmployeeComponent;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedId = params['id']
      let selected = this._employeeDataService.getEmployeeById(this.selectedId)
      if (selected) {
        this.selectedEmployee = selected;
      }
      console.log("Ng on Init called", this.selectedEmployee)
    });
  }
}
