import { Component, OnInit } from '@angular/core'; 
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-starts',
  templateUrl: './starts.component.html',
  styleUrls: ['./starts.component.css']
})
export class StartsComponent implements OnInit {
  iconUrl   = environment.uploadUrl;

  selectedTeam = ''; 
  
  teamsList:any;
  errorMessage: any;


  currentDate:any;
  yearStartDate:any;

  usersJoining:any;
  usersInterviews:any;
  usersJobPosting:any;
  usersSubmission:any;

  lastSixWeeksStarts:any;

  week1    = [];
  week2    = [];
  week3    = [];
  week4    = [];
  week5    = [];
  week6    = [];

  salesUsersJoining     = [];
  recruiterUsersJoining = [];

  merged       = [];
  usersDetails = [];

  
  constructor(private targetService: TargetService,private userService: UserService,
    private route: ActivatedRoute,) { }
  
  onTeamSelect(value:any){

     var teamId = value;

     localStorage.setItem('teamId', JSON.stringify(teamId));
     var userType    = JSON.parse(localStorage.getItem('userType'));
     this.getJoining(teamId,userType);

   }
 
  ngOnInit() {
    $("#main-content").css({"display": "none"});
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

         
          this.getJoining(teamId,userType);
    });

  }

  



  // get joinings
  getJoining(teamId,userType){
     this.merged.length       = 0;
     this.usersDetails.length = 0;
     this.week1.length        = 0;
     this.week2.length        = 0;
     this.week3.length        = 0;
     this.week4.length        = 0;
     this.week5.length        = 0;
     this.week6.length        = 0;
  	// call users joining
    this.targetService.getJoining(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
           if(resp['status_code'] == 200){
           	  this.usersJoining = resp['data'];

              this.salesUsersJoining.length     = 0; //for doing null array
              this.recruiterUsersJoining.length = 0;

             for(let i=0; i<this.usersJoining.length; i++) {
               
                if(this.usersJoining[i].speciality == '1'){
                   this.salesUsersJoining.push(this.usersJoining[i]);
                 }else if(this.usersJoining[i].speciality == '2'){
                   this.recruiterUsersJoining.push(this.usersJoining[i]);
                 }

              }

              if(userType == 1){
                 this.getInterviews(this.salesUsersJoining,teamId,userType);
             
              }else{
                 this.getInterviews(this.recruiterUsersJoining,teamId,userType);
                 
              }

           	}else{
           	 this.usersJoining = '';
           	}
          
      },
      
      error => this.errorMessage = <any>error
    );
  }


    getInterviews(joinings,teamId,userType){
  	// call users interviews
    this.targetService.getInterviews(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {

           if(resp['status_code'] == 200){

               this.usersInterviews = resp['data'];

               for(let i=0; i<joinings.length; i++) {
                 var dateOfJoin  = joinings[i].date_of_join;
                 var currentDate = this.currentDate;
                 let date1       = new Date(dateOfJoin);  let date2 = new Date(currentDate);  
                 let years       = this.yearsDiff(dateOfJoin, currentDate);  
                 let months      = (years * 12) + (date2.getMonth() - date1.getMonth()) ;

                  this.merged.push({
                   ...joinings[i], 
                   ...(this.usersInterviews.find((itmInner) => itmInner.id === joinings[i].id)),
                   months
                 }
                  );
               }

           }else{
               for(let i=0; i<joinings.length; i++) {
                 var dateOfJoin  = joinings[i].date_of_join;
                 var currentDate = this.currentDate;
                 let date1       = new Date(dateOfJoin);  let date2 = new Date(currentDate);  
                 let years       = this.yearsDiff(dateOfJoin, currentDate);  
                 let months      = (years * 12) + (date2.getMonth() - date1.getMonth()) ;

                  this.merged.push({
                   ...joinings[i],
                   months
                    }
                  );
               }
           }
           
          if(userType == 1){
            this.getJobPosting(this.merged,teamId);
          
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
           

            // sorting result
           this.usersDetails   = this.usersDetails.sort((a, b) => b.total_joining - a.total_joining);
           this.getLastSixWeeksJoinings(this.usersDetails);

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
           

           // sorting result
           this.usersDetails   = this.usersDetails.sort((a, b) => b.total_joining - a.total_joining);
         
           this.getLastSixWeeksJoinings(this.usersDetails);


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

  getLastSixWeeksJoinings(userDetails){
     this.targetService.getLastSixWeeksJoinings().subscribe(
      resp => {
        
            if(resp['status_code'] == 200){
              this.lastSixWeeksStarts = resp['data'];

             var w1 = this.lastSixWeeksStarts['w1'];
             var w2 = this.lastSixWeeksStarts['w2'];
             var w3 = this.lastSixWeeksStarts['w3'];
             var w4 = this.lastSixWeeksStarts['w4'];
             var w5 = this.lastSixWeeksStarts['w5'];
             var w6 = this.lastSixWeeksStarts['w6'];

             for(let i=0; i<userDetails.length; i++) {
                if(w1.find((itmInner) => itmInner.id === userDetails[i].id)){
                   this.week1.push({
                   ...userDetails[i], 
                   ...(w1.find((itmInner) => itmInner.id === userDetails[i].id))}
                   );
                }else{
                  var firstWeekJoinings = '0';
                  this.week1.push({
                   ...userDetails[i],
                   firstWeekJoinings 
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
                    var secondWeekJoinings = '0';
                     this.week2.push({
                     ...this.week1[i],
                     secondWeekJoinings 
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
                    var thirdWeekJoinings = '0';
                    this.week3.push({
                     ...this.week2[i], 
                     thirdWeekJoinings
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
                  var fourthWeekJoinings = '0';
                  this.week4.push({
                   ...this.week3[i],
                   fourthWeekJoinings
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
                  var fifthWeekJoinings = '0';
                  this.week5.push({
                   ...this.week4[i],
                   fifthWeekJoinings 
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
                  var sixWeekJoinings = '0';
                   this.week6.push({
                   ...this.week5[i],
                    sixWeekJoinings
                   }
                  );
                }
                      
              }
             console.log('lastsix',this.week6);
            }else{
              this.lastSixWeeksStarts = '';
            }

      },
      
      error => this.errorMessage = <any>error
    );
  }

}
