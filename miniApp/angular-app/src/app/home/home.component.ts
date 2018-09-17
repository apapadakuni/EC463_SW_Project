import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../User';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private userService: UserService) {}

  sub: any;
  id: string;
  user: User
  newRoom: string;
  selectedRoom: string;
  displayData: boolean;

  ngOnInit() {
    // Get the google ID from the URL and then look up the user from the db using the id. 
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // Make call to backend db, wait for user response and save the user. 
      this.userService.getUser(this.id).subscribe((user: User) => this.user = user);
    })
  }

  // Function to process the form. Extracts the name of the room and adds it to the user's array of room names. 
  // Also resaves the user with the new room in the database. 
  public submitRoom(f: NgForm) {
    this.user.rooms.push(f.value.newRoom);
    this.userService.updateUser(this.user).subscribe((user: User) => console.log(user.username));
  }

  // Upon clicking on a room name, passes the room name to the child data component and allows the child to be displayed. 
  public dispRoomData(roomName){
    // Variable passed to the child component indicating the name of the room to display data for. 
    this.selectedRoom = roomName;
    // Flag indicating whether to display data about the room. 
    this.displayData = true;
  }

}
