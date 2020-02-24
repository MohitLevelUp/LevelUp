import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { environment } from '../../environments/environment';
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

  teamsSubmissions:any;
  teamsJoining:any;
  teamsInterviews:any;
  
 
  merged = [];
  teamsDetails = [];
  constructor(private targetService: TargetService) { }

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

           this.teamsJoining = resp['data'];

           for(let i=0; i<teamsSubmissions.length; i++) {
              this.merged.push({
               ...teamsSubmissions[i], 
               ...(this.teamsJoining.find((itmInner) => itmInner.team_id === teamsSubmissions[i].team_id))}
              );
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
           this.teamsInterviews = resp['data'];

           for(let i=0; i<mergeResult.length; i++) {
    			  this.teamsDetails.push({
    			   ...mergeResult[i], 
    			   ...(this.teamsInterviews.find((itmInner) => itmInner.team_id === mergeResult[i].team_id))}
    			  );
    			}

          console.log('teee',this.teamsDetails);


      },
      
      error => this.errorMessage = <any>error
    );
  }

}
