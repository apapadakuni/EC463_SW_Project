import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  sub: any;
  username: string;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params['username'];
    })
  }

}
