import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './User';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  getUser(id) {
    return this.http.get<User>("http://localhost:3000/auth/getUser/" + id);
  }

  updateUser(updatedUser: User){
    return this.http.post<User>("http://localhost:3000/auth/updateUser", updatedUser, this.httpOptions)
  }
}

/// Write service to get User
/// Write User class
/// Make call to user service
/// display the rooms