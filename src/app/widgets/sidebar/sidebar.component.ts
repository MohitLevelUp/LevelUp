import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	
  user = JSON.parse(localStorage.getItem('user'));

  constructor(public userService: UserService) { }

  ngOnInit() {

  }

}
