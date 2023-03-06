import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') ?? "");
   }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? "");
    if (currentUser) {
      this.currentUser = currentUser;
    }
  }


}
