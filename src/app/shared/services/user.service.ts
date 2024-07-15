import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081/usuario';

  constructor(private http: HttpClient) {}

  register(request: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, request);
  }

  update(id: string, request: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, request);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getCep(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
