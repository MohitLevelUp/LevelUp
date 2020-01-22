import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  iconUrl        = environment.uploadUrl;

  userList:any;
  errorMessage: any;

  teamInfo: Array<{ teamName: string, teamLogo: string, managerName: string, slug: string }> = [];

  constructor(private userService: UserService,private router: Router,
  	private route: ActivatedRoute,) { }

  ngOnInit() {

  	var teamId      = localStorage.getItem('teamDetailPageId');


  	//get team's user list
    this.userService.teamsUserList(teamId).subscribe(
      resp => {
      	if(resp.status_code == 200){
      		this.userList = resp['data']; 
          console.log(this.userList);
      		

        for (let i = 0; i < this.userList.length; i++) {
        	if(this.userList[i].role_type == 2)
        	this.teamInfo.push({ 'teamName': this.userList[i].team_name, 'teamLogo': this.userList[i].team_logo, 'managerName': this.userList[i].display_name, 'slug':this.userList[i].slug });
        }



      	}
        
      },
      
      error => this.errorMessage = <any>error
    );
  }

}
