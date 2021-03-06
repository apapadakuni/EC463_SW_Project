import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, SimpleChange } from '@angular/core';
import {Chart } from "chart.js";
import {DataService} from  "../data.service";
import {SensorData} from "../SensorData";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  // Necessary for getting the context of the canvas element in the html document. 
  // Context is necessary for building the chart with chart.js
  // https://stackoverflow.com/questions/36650455/chart-js-cannot-read-property-length-of-undefined - explains context issue
  // https://stackoverflow.com/questions/48046386/angular-chart-js-error-failed-to-create-chart-cant-acquire-context-from-the-g?rq=1 - explains element references
  @ViewChild('canvas') canvas: ElementRef;

  constructor(private dataService: DataService) { }

  // Get the room name from the parent component. 
  // Info on Child-Parent Interactions: https://angular.io/guide/component-interaction
  @Input() selectedRoom: string;

  chart = [];

  // Wait for the selectedRoom to be loaded from the parent.
  // Resource on OnChanges: https://angular.io/api/core/OnChanges
  ngOnChanges(changes:  SimpleChange) {
    if (changes['selectedRoom']) {

      // Once the selected room has been loaded, call backend to get the sensor data. 
      // Upon receipt of the sensor data, create the chart. 
      this.dataService.getSensorData().subscribe((sensorData: SensorData) => {
        this.chart = [];
        this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
          type: 'line', // want line chart
        data: {
          labels: sensorData.Time,//["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a"], //x axis values - times
          datasets: [
            {
              label: "Humidity", // label for the second series
              backgroundColor: 'rgb(100, 100, 200)', // color of the line
              borderColor: 'rgb(0, 0, 255)',  // color of the fill underneath the line
              data: sensorData.Humidity//[10, 3, 6, 5, 12, 8, 16, 17, 6, 7, 6, 10] // y-axis data points - humidity
            },
            {
              label: "Temp", // label for the first series
              backgroundColor: 'rgb(255, 100, 100)', // color of the line
              borderColor: 'rgb(255, 000, 000)', // color of the fill underneath the line
              data: sensorData.Temperature//[10, 8, 6, 5, 25, 8, 16, 1, 6, 7, 18, 5] // y-axis data points - temperature
            }
          ]
        },
          options: {
            legend: {
              display: true
            },
            title: {
              display: true,
              text: 'Temperature and Humidity vs. Time in the ' + this.selectedRoom
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  fontSize: 30,
                  labelString: "Time"
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  fontSize: 30,
                  labelString: 'Temperature (*F) and Humidity (%)'
                }
              }],
            }
          }
        });
      });
    }
  }

  ngOnInit() {
    
  }

}

//13.59.178.74 6969

