import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  iconUrl        = environment.uploadUrl;
  teamInfo: any;
  errorMessage: any;

  constructor(private userService: UserService,) { }

  ngOnInit() {
  	 this.userService.teamList().subscribe(
      resp => {
       
        if(resp['status_code'] == 200){
        	this.teamInfo = resp['data']; 
        }else{
        	this.teamInfo ='';
        }
      },
      
      error => this.errorMessage = <any>error
    );
  }

}
