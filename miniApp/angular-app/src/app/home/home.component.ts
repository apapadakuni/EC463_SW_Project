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
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.getUser(this.id).subscribe((user: User) => this.user = user);
    })
  }

  public submitRoom(f: NgForm) {
    console.log(f.value.newRoom);  // { first: '', last: '' }
    this.user.rooms.push(f.value.newRoom);
    this.userService.updateUser(this.user).subscribe((user: User) => console.log(user.username));
  }

  public dispRoomData(roomName){

    this.selectedRoom = roomName;
    this.displayData = true;
    console.log(roomName);
  }

}
