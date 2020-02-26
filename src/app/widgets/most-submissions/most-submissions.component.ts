import { Component, OnInit } from '@angular/core'; 
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'; 

@Component({
  selector: 'app-most-submissions',
  templateUrl: './most-submissions.component.html',
  styleUrls: ['./most-submissions.component.css']
})
export class MostSubmissionsComponent implements OnInit {

  iconUrl   = environment.uploadUrl;

  teamsList:any;
  errorMessage: any;
  

  currentDate:any;
  yearStartDate:any;

  usersJoining:any;
  usersInterviews:any;
  usersSubmission:any;

  merged = [];
  usersDetails = [];

  constructor(private targetService: TargetService,private userService: UserService,) { }

  onTeamSelect(value:any){

     var teamId = value;
     localStorage.setItem('teamId', JSON.stringify(teamId));
     this.getSubmission(teamId);

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
   
    this.getSubmission(teamId);

  }



  // get submissions
getSubmission(teamId){
	this.merged.length       = 0;
    this.usersDetails.length = 0;

    this.targetService.getSubmission(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
          if(resp['status_code'] == 200){
             this.usersSubmission = resp['data'];
             console.log(this.usersSubmission);
             this.getInterviews(this.usersSubmission,teamId);
          }else{
             this.usersSubmission = '';
          }
         
      },
      
      error => this.errorMessage = <any>error
    );
  }



  getInterviews(submissions,teamId){
  	// call users interviews
    this.targetService.getInterviews(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
          if(resp['status_code'] == 200){
             this.usersInterviews = resp['data'];
             for(let i=0; i<submissions.length; i++) {

              // getting users total month from joining date
               var dateOfJoin  = submissions[i].date_of_join;
               var currentDate = this.currentDate;
               let date1       = new Date(dateOfJoin);  let date2 = new Date(currentDate);  
               let years       = this.yearsDiff(dateOfJoin, currentDate);  
               let months      = (years * 12) + (date2.getMonth() - date1.getMonth()) ;

              this.merged.push({
               ...submissions[i], 
               ...(this.usersInterviews.find((itmInner) => itmInner.id === submissions[i].id)),
               months
              });
          }
          
           
          }
          else{
             for(let i=0; i<submissions.length; i++) {
               
               // getting users total month from joining date
               var dateOfJoin  = submissions[i].date_of_join;
               var currentDate = this.currentDate;
               let date1       = new Date(dateOfJoin);  let date2 = new Date(currentDate);  
               let years       = this.yearsDiff(dateOfJoin, currentDate);  
               let months      = (years * 12) + (date2.getMonth() - date1.getMonth()) ;

                this.merged.push({
                 ...submissions[i],
                 months
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
           this.usersDetails   = this.usersDetails.sort((a, b) => b.total_submission - a.total_submission);
         

   
      },
      
      error => this.errorMessage = <any>error
    );
  }


   // year difference
   yearsDiff(d1, d2) {   
    let date1     = new Date(d1);    
    let date2     = new Date(d2);    
    let yearsDiff =  date2.getFullYear() - date1.getFullYear();   
    return yearsDiff;
  }  

}
