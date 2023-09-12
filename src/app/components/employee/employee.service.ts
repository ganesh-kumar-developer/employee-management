import { Injectable } from "@angular/core";
import { Employee } from "src/app/shared/modal/employee.modal";

@Injectable({providedIn: 'root'})

export class EmployeeDataService {
    dataShownInList: Employee[] = [];
    employeeList: Employee[] = [];
    selectedEmployee: Employee = {id: 0, name:''}

    getEmployeeOnListById(id: number) {
        return this.dataShownInList[id];
    }
    
    setDataShownOnList(employees: Employee[]) {
        this.dataShownInList = employees
    }

    setEmployees(employees: Employee[]) {
        this.employeeList = employees;
        localStorage.setItem("employeeList", JSON.stringify(employees));
    }

    getEmployeeById(id: number): Employee {
        if (!this.employeeList.length) {
            let item = localStorage.getItem('employeeList');
            if (typeof item == 'string') {
                this.setEmployees(JSON.parse(item))
            }
        }
        this.employeeList.forEach((employee) => {
            if (employee.id == id) {
                this.selectedEmployee = employee;
            }
        });
        return this.selectedEmployee;
    }
}