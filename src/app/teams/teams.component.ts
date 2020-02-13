import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../environments/environment';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  iconUrl        = environment.uploadUrl;
  teamInfo: any;
  errorMessage: any;

  constructor(private userService: UserService,private router: Router,) { }

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

  //go to team details page
 teamDetails(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var teamId = idAttr.nodeValue;

    localStorage.setItem('teamDetailPageId', teamId);
    this.router.navigate(['/team-details']);
     
     


 }

}
