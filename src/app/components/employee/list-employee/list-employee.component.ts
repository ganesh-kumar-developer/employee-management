import { Component, Input, OnInit } from '@angular/core';

import { EmployeeService } from 'src/app/services/api/employee.service';
import { Employee } from 'src/app/shared/modal/employee.modal';
import { EmployeeDataService } from '../employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  @Input() searchTerm: string = '';

  employees: Employee[] = [];
  dataToShow: Employee[] = [];
  loading: boolean = false;
  total: number = 0; // Total of All records to show
  limit: number = 10; // Per Page Limit
  searchKey: string = ''
  sortedBy: string = ''
  sortAsc: boolean = false

  constructor(private _employeeService: EmployeeService, private _employeeDataService: EmployeeDataService) {  }

  ngOnInit(): void {
    this.loading = true;
    this._employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      this._employeeDataService.setEmployees(this.employees);
      this.dataToShow = JSON.parse(JSON.stringify(response));
      this.updateTotal(this.employees.length);
      this.updateDataToShow(this.employees.slice(0, this.limit));
      this.sortByKey('name');
      this.loading = false;
    },
    (error) => {
      console.error("Error")
      console.log(error);
    });
  }

  pageChange(pageParam: {displayRecordFrom: number, displayRecordTo: number}) {
    console.log("Page Param: ", pageParam);
    this.filterSearchData();
    this.updateTotal(this.dataToShow.length);
    this.updateDataToShow(this.dataToShow.slice(pageParam.displayRecordFrom, pageParam.displayRecordTo));
  }

  onSearchChange(searchKey: string) {
    this.searchKey = searchKey;
    this.filterSearchData();
    if (this.searchKey) {
      this.updateTotal(this.dataToShow.length);
      this.updateDataToShow(this.dataToShow.slice(0, this.limit));
    } else {
      this.updateTotal(this.dataToShow.length);
      this.updateDataToShow(this.employees.slice(0, this.limit));
    }
  }

  filterSearchData() {
    if(this.searchKey) {
      let filterData = this.employees.filter((employee) => {
        for (let [key, value] of Object.entries(employee)) {
          if (value?.toString().toLowerCase().includes(this.searchKey.toLowerCase()))
            return true
        }
        return false
      });
      this.updateDataToShow(filterData);
    }
    else {
      // Reset
      this.updateDataToShow(this.employees);
    }
  }

  updateDataToShow(employees: Employee[]) {
    this.dataToShow = employees;
    // this._employeeDataService.setDataShownOnList(this.dataToShow);
  }

  updateTotal(total: number): void {
    this.total = total;
  }

  sortByKey(key: string) {
    this.filterSearchData();
    this.updateTotal(this.dataToShow.length);
    if (key == this.sortedBy && key != '') {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortAsc = true;
    }
    console.warn("sorteASC: ", this.sortAsc);
    this.sortedBy = key;
    this.dataToShow.sort((first: Employee, next: Employee): number => {
      if (first.hasOwnProperty(key)) {
        let fistValue = (first as any)[key];
        let secondValue = (next as any)[key];
        if (this.sortAsc) {
          if(fistValue > secondValue) {
            return 1
          }
          else if(fistValue < secondValue) {
            return -1
          }
          else {
            return 0
          }
        }
        else {
          if(fistValue < secondValue) {
            return 1
          }
          else if(fistValue > secondValue) {
            return -1
          }
          else {
            return 0
          }
        }
      }
      return 0
    });
    this.updateDataToShow(this.dataToShow.slice(0, this.limit));
    console.warn("Sort Key: ", key)
    console.log("Sorted Data: ", this.dataToShow);
  }

  getEmployeeById(id: number) {
    return this.employees[id];
  }
}
