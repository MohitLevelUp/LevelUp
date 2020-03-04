import { Component, OnInit } from '@angular/core'; 
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'; 

@Component({
  selector: 'app-last-month-starts',
  templateUrl: './last-month-starts.component.html',
  styleUrls: ['./last-month-starts.component.css']
})
export class LastMonthStartsComponent implements OnInit {
  iconUrl   = environment.uploadUrl;

  selectedTeam = '';
  
  teamsList:any;
  errorMessage: any;

  currentDate:any;
  startDate:any;
  endDate:any;

  usersJoining:any;
  usersInterviews:any;
  usersJobPosting:any;
  usersSubmission:any;

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

   this.startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');

   this.endDate   = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');


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
  	// call users joining
    this.targetService.getJoining(this.startDate,this.endDate,teamId).subscribe(
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
    this.targetService.getInterviews(this.startDate,this.endDate,teamId).subscribe(
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
    this.targetService.getJobPosting(this.startDate,this.endDate,teamId).subscribe(
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
         

      },
      
      error => this.errorMessage = <any>error
    );
  }


// get submissions
getSubmission(mergeResult,teamId){
    // call teams interviews
    this.targetService.getSubmission(this.startDate,this.endDate,teamId).subscribe(
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