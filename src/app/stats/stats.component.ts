import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { environment } from '../../environments/environment';
import { UserService } from 'src/app/_services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  iconUrl   = environment.uploadUrl;
  
  errorMessage: any;
  teamsFlag = 1;
  usersFlag = 0;

  
  currentDate:any;
  yearStartDate:any;
  
  teamInfo:any;
  teamsSubmissions:any;
  teamsJoining:any;
  teamsInterviews:any;
  
 
  merged = [];
  teamsDetails = [];
  pointsDetails = [];
  constructor(private targetService: TargetService,private userService: UserService) { }

  

  ngOnInit() {
  	var date             = new Date();
    this.currentDate     = moment(date).format('YYYY-MM-DD');
    this.yearStartDate   = moment().startOf('year').format('YYYY-MM-DD');

    this.getSubmissions();
    
  }

  getSubmissions(){
  	 // call totalsubmission according to user
    this.targetService.getAllTeamsSubmissionsTotal(this.yearStartDate,this.currentDate).subscribe(
      resp => {
         if(resp['status_code'] == 200){
         	this.teamsSubmissions = resp['data'];
            this.getJoining(this.teamsSubmissions);
         }else{
         	this.teamsSubmissions ='';
         }
         
         
      },
      
      error => this.errorMessage = <any>error
    );
  }

// get joinings
  getJoining(teamsSubmissions){
  	// call teams job posting 
    this.targetService.getAllTeamsJoiningsTotal(this.yearStartDate,this.currentDate).subscribe(
      resp => {
           if(resp['status_code'] == 200){

           this.teamsJoining = resp['data'];

           for(let i=0; i<teamsSubmissions.length; i++) {
              this.merged.push({
               ...teamsSubmissions[i], 
               ...(this.teamsJoining.find((itmInner) => itmInner.team_id === teamsSubmissions[i].team_id))}
              );
            }

           }else{
             for(let i=0; i<teamsSubmissions.length; i++) {
              this.merged.push({
               ...teamsSubmissions[i]
               });
            }
           }
           
           this.getInterviews(this.merged);
      },
      
      error => this.errorMessage = <any>error
    );
  }

// get interviews 
  getInterviews(mergeResult){
  	// call teams interviews
    this.targetService.getAllTeamsInterviewsTotal(this.yearStartDate,this.currentDate).subscribe(
      resp => {

          if(resp['status_code'] == 200){
            this.teamsInterviews = resp['data'];

           for(let i=0; i<mergeResult.length; i++) {
              this.teamsDetails.push({
               ...mergeResult[i], 
               ...(this.teamsInterviews.find((itmInner) => itmInner.team_id === mergeResult[i].team_id))}
              );
            }
            
          }else{
             for(let i=0; i<mergeResult.length; i++) {
              this.teamsDetails.push({
               ...mergeResult[i] 
               });
            }
          }
           

          console.log('teee',this.teamsDetails);
           this.getTeamList(this.teamsDetails);

      },
      
      error => this.errorMessage = <any>error
    );
  }

  // //getting team list
  getTeamList(teamDetails){
     //get all team's details
    this.userService.teamList().subscribe(
      resp => {
        this.teamInfo = resp['data']; 
        for(let i=0; i<teamDetails.length; i++) {
          
           if(this.teamInfo.find((itmInner) => itmInner.id === teamDetails[i].team_id)){
              this.pointsDetails.push({
             ...teamDetails[i], 
             ...(this.teamInfo.find((itmInner) => itmInner.id === teamDetails[i].team_id))}
             );
           }
           
          }
        console.log(this.teamInfo);
        console.log('details',this.pointsDetails);
      },
      
      error => this.errorMessage = <any>error
    );
  }

}
