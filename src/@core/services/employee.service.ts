import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { Data, Employee, EmployeeDTO } from './../models/employee';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    endpoint: string = environment.endpoint;

    constructor(private http: HttpClient) { }

    create(body: Employee):Observable<EmployeeDTO> {
        return this.http.post<EmployeeDTO>(`${this.endpoint}/v1/employee`, body);
    }

    findAll(): Observable<Data> {
        return this.http.get<Data>(`${this.endpoint}/v1/employee`);
    }

    findById(id: string): Observable<EmployeeDTO> {
        return this.http.get<EmployeeDTO>(`${this.endpoint}/v1/employee/${id}`);
    }

    remove(id: string): Observable<EmployeeDTO> {
        return this.http.delete<EmployeeDTO>(`${this.endpoint}/v1/employee/${id}`);
    }

}
