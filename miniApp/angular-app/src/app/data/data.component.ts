import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor() { }

  // Get the room name from the parent component. 
  // Info on Child-Parent Interactions: https://angular.io/guide/component-interaction
  @Input() selectedRoom: string;

  ngOnInit() {
  }

}
