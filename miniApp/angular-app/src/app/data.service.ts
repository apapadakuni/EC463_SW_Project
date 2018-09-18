import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './User';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  // Function to request the user data from the backend db. 
  getUser(id) {
    return this.http.get<User>("http://localhost:3000/auth/getUser/" + id);
  }
}