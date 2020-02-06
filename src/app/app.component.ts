import { Component } from '@angular/core';
import { Router }  from "@angular/router";
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'levelUp';
  errorMessage: any;

  constructor(public router: Router,private userService: UserService,){}

	ngOnInit() {
		var currentUser  = JSON.parse(localStorage.getItem('user'));

		if(currentUser != null){

			var userId = currentUser['user_id'];

	        this.userService.getUser(userId).subscribe(
		      res => {
		      	if(res['status_code'] == 200){

		      		// console.log('correct');
		      	}else{
		      		localStorage.removeItem('authToken');
	                localStorage.removeItem('user');
		      	}
		       
		      },
		      
		      error => this.errorMessage = <any>error
		    );
		}
		
	}
}
