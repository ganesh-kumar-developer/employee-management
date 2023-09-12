import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  searchTerm: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }
}
