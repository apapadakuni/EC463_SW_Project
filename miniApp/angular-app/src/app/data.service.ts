import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SensorData} from './SensorData';
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

  // Function to request the user data from the backend db. Hits a route which opens socket to the EC2 instance, which sends data.
  // Returned data is formatted as a SensorData object. 
  getSensorData() {
    return this.http.get<SensorData>("http://localhost:3000/sensorData");
  }
}
