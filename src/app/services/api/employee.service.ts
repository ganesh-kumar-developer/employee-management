import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
import { Employee } from '../../shared/modal/employee.modal'

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    url: String;

    constructor(private _config: ConfigService,
                private _httpClient: HttpClient) {
        this.url = _config.apiURL;
    }

    getAllEmployees(): Observable<Employee[]>{
        return this._httpClient.get<Employee[]>(`${this.url}/getEmployees`);
    }
}