import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-most-job-orders',
  templateUrl: './most-job-orders.component.html',
  styleUrls: ['./most-job-orders.component.css']
})
export class MostJobOrdersComponent implements OnInit {
  iconUrl   = environment.uploadUrl;

  teamsList:any;
  errorMessage: any;
  

  currentDate:any;
  yearStartDate:any;

  usersJoining:any;
  usersInterviews:any;
  usersJobPosting:any;

  merged = [];
  usersDetails = [];

  constructor(private targetService: TargetService,private userService: UserService,) { }

  onTeamSelect(value:any){

     var teamId = value;
     localStorage.setItem('teamId', JSON.stringify(teamId));
     this.getJobPosting(teamId);

   }

  ngOnInit() {
  	var date             = new Date();
    this.currentDate     = moment(date).format('YYYY-MM-DD');
    this.yearStartDate   = moment().startOf('year').format('YYYY-MM-DD');
    localStorage.removeItem('teamId');

     // get team list
     this.userService.teamList().subscribe(
      resp => {
           if(resp['status_code'] == 200){
             this.teamsList = resp['data'];
             }else{
              this.teamsList = '';
             }
          
      },
      error => this.errorMessage = <any>error
    );


    // set teamId variable
    var team_id   = '';
    var teamID    = JSON.parse(localStorage.getItem('teamId'));

    if(teamID == null){
      var teamId = team_id;
    }else{
      teamId = teamID;
    }
   
    this.getJobPosting(teamId);

  }

   getJobPosting(teamId){
     this.merged.length       = 0;
     this.usersDetails.length = 0;
  	// call teams job posting
    this.targetService.getJobPosting(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
             if(resp['status_code'] == 200){
	           	 this.usersJobPosting = resp['data'];
	           	 console.log('post',this.usersJobPosting);
	           	 this.getInterviews(this.usersJobPosting,teamId);
           	 
	           	}else{
	           	 this.usersJobPosting = '';
	           	}
      },
      
      error => this.errorMessage = <any>error
    );
  }

  getInterviews(jobPosting,teamId){
  	// call users interviews
    this.targetService.getInterviews(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
          if(resp['status_code'] == 200){
             this.usersInterviews = resp['data'];
             console.log('int',this.usersInterviews);
             for(let i=0; i<jobPosting.length; i++) {
              this.merged.push({
               ...jobPosting[i], 
               ...(this.usersInterviews.find((itmInner) => itmInner.id === jobPosting[i].id))}
              );
          }
           console.log('mer',this.merged);
           
          }
          else{
             for(let i=0; i<jobPosting.length; i++) {
                this.merged.push({
                 ...jobPosting[i]
                 });
             }
          }
          
          this.getJoining(this.merged,teamId); 


      },
      
      error => this.errorMessage = <any>error
    );
  }

  // get joinings
  getJoining(mergeResult,teamId){
  	// call users joining
    this.targetService.getJoining(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
            if(resp['status_code'] == 200){
               this.usersJoining = resp['data'];
               console.log('st',this.usersJoining);
                for(let i=0; i<mergeResult.length; i++) {
                  this.usersDetails.push({
                   ...mergeResult[i], 
                   ...(this.usersJoining.find((itmInner) => itmInner.id === mergeResult[i].id))
                        
                  });
                }
            }else{
                for(let i=0; i<mergeResult.length; i++) {
                  this.usersDetails.push({
                   ...mergeResult[i]     
                  });
                }
            }

             // sorting result
           this.usersDetails   = this.usersDetails.sort((a, b) => b.total_job_posting - a.total_job_posting);
         

   
      },
      
      error => this.errorMessage = <any>error
    );
  }


    



 

}
