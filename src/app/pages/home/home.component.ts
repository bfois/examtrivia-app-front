import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')?? "");
    if (currentUser) {
      this.currentUser = currentUser;
    }
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }


}
