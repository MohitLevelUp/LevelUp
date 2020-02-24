import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-most-interviews',
  templateUrl: './most-interviews.component.html',
  styleUrls: ['./most-interviews.component.css']
})
export class MostInterviewsComponent implements OnInit {
 iconUrl   = environment.uploadUrl;

  order: string = 'total_interviews';
  selectedTeam = '';
  
  teamsList:any;
  errorMessage: any;


  currentDate:any;
  yearStartDate:any;

  usersJoining:any;
  usersInterviews:any;
  usersJobPosting:any;
  usersSubmission:any;

  salesUsersInterviews     = [];
  recruiterUsersInterviews = [];

  merged       = [];
  usersDetails = [];
  constructor(private targetService: TargetService,private userService: UserService,
    private route: ActivatedRoute,) { }

  onTeamSelect(value:any){

     var teamId = value;

     localStorage.setItem('teamId', JSON.stringify(teamId));
     var userType    = JSON.parse(localStorage.getItem('userType'));
     this.getInterviews(teamId,userType);

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

     // get url id
     this.route.params.subscribe(params => {
          var userType = params['id']; //1=sales or 2=recruiter

          localStorage.setItem('userType', JSON.stringify(userType));

          var team_id   = '';

          var teamID    = JSON.parse(localStorage.getItem('teamId'));

          if(teamID == null){
            var teamId = team_id;
          }else{
            teamId = teamID;
          }

         
          this.getInterviews(teamId,userType);
    });
  }


   getInterviews(teamId,userType){
     this.merged.length       = 0;
     this.usersDetails.length = 0;
  	// call users interviews
    this.targetService.getInterviews(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {

      	  if(resp['status_code'] == 200){
           	  this.usersInterviews = resp['data'];
              console.log('inter',this.usersInterviews);
              this.salesUsersInterviews.length     = 0; //for doing null array
              this.recruiterUsersInterviews.length = 0;

             for(let i=0; i<this.usersInterviews.length; i++) {
               
                if(this.usersInterviews[i].speciality == '1'){
                   this.salesUsersInterviews.push(this.usersInterviews[i]);
                 }else if(this.usersInterviews[i].speciality == '2'){
                   this.recruiterUsersInterviews.push(this.usersInterviews[i]);
                 }

              }

              if(userType == 1){
                  this.getJoining(this.salesUsersInterviews,teamId,userType);
                 // console.log('sales',this.salesUsersJoining);
              }else{
                  this.getJoining(this.recruiterUsersInterviews,teamId,userType);
                 // console.log('rec',this.recruiterUsersJoining);
              }

           	}else{
           	 this.usersInterviews = '';
           	}

      },
      
      error => this.errorMessage = <any>error
    );
  }

   // get joinings
  getJoining(interviews,teamId,userType){
    
  	// call users joining
    this.targetService.getJoining(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
           if(resp['status_code'] == 200){
           	  this.usersJoining = resp['data'];
              console.log('joining',this.usersJoining);

              for(let i=0; i<interviews.length; i++) {
                  this.merged.push({
                   ...interviews[i], 
                   ...(this.usersJoining.find((itmInner) => itmInner.id === interviews[i].id))}
                  );
               }

           	}else{
           	   for(let i=0; i<interviews.length; i++) {
                  this.merged.push({
                   ...interviews[i]
                    }
                  );
                }
           	}
            if(userType == 1){
              this.getJobPosting(this.merged,teamId);
              console.log('merget',this.merged);
            }else{
              this.getSubmission(this.merged,teamId);
            }
          
      },
      
      error => this.errorMessage = <any>error
    );
  }


   



  getJobPosting(mergeResult,teamId){
  	// call teams job posting
    this.targetService.getJobPosting(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
            if(resp['status_code'] == 200){
               this.usersJobPosting = resp['data'];
               console.log('jobpost',resp);
               for(let i=0; i<mergeResult.length; i++) {
                  this.usersDetails.push({
                   ...mergeResult[i], 
                   ...(this.usersJobPosting.find((itmInner) => itmInner.id === mergeResult[i].id))
                        
                  });
              }
            }else{
              for(let i=0; i<mergeResult.length; i++) {
                  this.usersDetails.push({
                   ...mergeResult[i]  
                  });
              }
            }
           

          console.log('details',this.usersDetails);

      },
      
      error => this.errorMessage = <any>error
    );
  }


// get submissions
getSubmission(mergeResult,teamId){
    // call teams interviews
    this.targetService.getSubmission(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
          if(resp['status_code'] == 200){
             this.usersSubmission = resp['data'];
             console.log('sub',this.usersSubmission);
             for(let i=0; i<mergeResult.length; i++) {
                this.usersDetails.push({
                 ...mergeResult[i], 
                 ...(this.usersSubmission.find((itmInner) => itmInner.id === mergeResult[i].id))
                    
                });
             }
          }else{
             for(let i=0; i<mergeResult.length; i++) {
                this.usersDetails.push({
                 ...mergeResult[i]   
                });
             }
          }
           

           console.log('usersDetails',this.usersDetails);


      },
      
      error => this.errorMessage = <any>error
    );
  }

}
