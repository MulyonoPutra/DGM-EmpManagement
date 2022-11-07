import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, Login } from '../models/login';
import { IRegister, Register } from '../models/register';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    endpoint: string = environment.endpoint;

    constructor(private http: HttpClient) { }

    login(body: Login): Observable<ILogin> {
        return this.http.post<ILogin>(`${this.endpoint}/v1/auth/login`, body);
    }

    register(body: Register): Observable<IRegister> {
        return this.http.post<IRegister>(`${this.endpoint}/v1/auth/register`, body);
    }

}
