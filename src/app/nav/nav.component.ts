import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authToken = JSON.parse(localStorage.getItem('authToken'));

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  // logout() {
  //   localStorage.removeItem('authToken');
  //   this.router.navigate(['/']);
  // }

}
