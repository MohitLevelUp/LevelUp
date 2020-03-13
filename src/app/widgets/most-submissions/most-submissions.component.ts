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

  lastSixWeeksSubmissions:any;

  week1    = [];
  week2    = [];
  week3    = [];
  week4    = [];
  week5    = [];
  week6    = [];

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

    this.week1.length        = 0;
    this.week2.length        = 0;
    this.week3.length        = 0;
    this.week4.length        = 0;
    this.week5.length        = 0;
    this.week6.length        = 0;


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
           
           this.getLastSixWeeksSubmissions(this.usersDetails);

   
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
  
    getLastSixWeeksSubmissions(userDetails){
     this.targetService.getLastSixWeeksSubmissions().subscribe(
      resp => {
        
            if(resp['status_code'] == 200){
              this.lastSixWeeksSubmissions = resp['data'];

             var w1 = this.lastSixWeeksSubmissions['w1'];
             var w2 = this.lastSixWeeksSubmissions['w2'];
             var w3 = this.lastSixWeeksSubmissions['w3'];
             var w4 = this.lastSixWeeksSubmissions['w4'];
             var w5 = this.lastSixWeeksSubmissions['w5'];
             var w6 = this.lastSixWeeksSubmissions['w6'];

             for(let i=0; i<userDetails.length; i++) {
                if(w1.find((itmInner) => itmInner.id === userDetails[i].id)){
                   this.week1.push({
                   ...userDetails[i], 
                   ...(w1.find((itmInner) => itmInner.id === userDetails[i].id))}
                   );
                }else{
                  var firstWeekSubmissions = '0';
                  this.week1.push({
                   ...userDetails[i],
                   firstWeekSubmissions 
                   }
                   );
                }
             }

              for(let i=0; i<this.week1.length; i++) {

                  if(w2.find((itmInner) => itmInner.id === this.week1[i].id)){
                    this.week2.push({
                     ...this.week1[i], 
                     ...(w2.find((itmInner) => itmInner.id === this.week1[i].id))}
                    );
                  }else{
                    var secondWeekSubmissions = '0';
                     this.week2.push({
                     ...this.week1[i],
                     secondWeekSubmissions 
                     }
                    );
                  }
                      
              }

              for(let i=0; i<this.week2.length; i++) {

                  if(w3.find((itmInner) => itmInner.id === this.week2[i].id)){
                    this.week3.push({
                     ...this.week2[i], 
                     ...(w3.find((itmInner) => itmInner.id === this.week2[i].id))}
                    );
                  }else{
                    var thirdWeekSubmissions = '0';
                    this.week3.push({
                     ...this.week2[i], 
                     thirdWeekSubmissions
                     }
                    );
                  }
                     
              }

              for(let i=0; i<this.week3.length; i++) {

                if(w4.find((itmInner) => itmInner.id === this.week3[i].id)){
                  this.week4.push({
                   ...this.week3[i], 
                   ...(w4.find((itmInner) => itmInner.id === this.week3[i].id))}
                  );
                }else{
                  var fourthWeekSubmissions = '0';
                  this.week4.push({
                   ...this.week3[i],
                   fourthWeekSubmissions
                   }
                  );
                }
                      
              }

              for(let i=0; i<this.week4.length; i++) {

                if(w5.find((itmInner) => itmInner.id === this.week4[i].id)){
                  this.week5.push({
                   ...this.week4[i], 
                   ...(w5.find((itmInner) => itmInner.id === this.week4[i].id))}
                  );
                }else{
                  var fifthWeekSubmissions = '0';
                  this.week5.push({
                   ...this.week4[i],
                   fifthWeekSubmissions 
                   }
                  );
                }
                
              }

              for(let i=0; i<this.week5.length; i++) {

                if(w6.find((itmInner) => itmInner.id === this.week5[i].id)){
                  this.week6.push({
                   ...this.week5[i], 
                   ...(w6.find((itmInner) => itmInner.id === this.week5[i].id))}
                  );
                }else{
                  var sixWeekSubmissions = '0';
                   this.week6.push({
                   ...this.week5[i],
                    sixWeekSubmissions
                   }
                  );
                }
                      
              }
             console.log('lastsix',this.week6);
            }else{
              this.lastSixWeeksSubmissions = '';
            }

      },
      
      error => this.errorMessage = <any>error
    );
  }

}
