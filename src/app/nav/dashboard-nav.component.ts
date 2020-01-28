import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit {
 user = JSON.parse(localStorage.getItem('user'));	

  constructor(private userService: UserService,) { }

  ngOnInit() {


  }

}
