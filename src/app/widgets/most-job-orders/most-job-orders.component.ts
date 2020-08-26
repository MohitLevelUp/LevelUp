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

  lastSixWeeksJobOrder:any;

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
     this.week1.length        = 0;
     this.week2.length        = 0;
     this.week3.length        = 0;
     this.week4.length        = 0;
     this.week5.length        = 0;
     this.week6.length        = 0;
  	// call teams job posting
    this.targetService.getJobPosting(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
             if(resp['status_code'] == 200){
	           	 this.usersJobPosting = resp['data'];
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
             for(let i=0; i<jobPosting.length; i++) {

              // getting users total month from joining date
               var dateOfJoin  = jobPosting[i].date_of_join;
               var currentDate = this.currentDate;
               let date1       = new Date(dateOfJoin);  let date2 = new Date(currentDate);  
               let years       = this.yearsDiff(dateOfJoin, currentDate);  
               let months      = (years * 12) + (date2.getMonth() - date1.getMonth()) ;

              this.merged.push({
               ...jobPosting[i], 
               ...(this.usersInterviews.find((itmInner) => itmInner.id === jobPosting[i].id)),
               months
              });
          }
          
           
          }
          else{
             for(let i=0; i<jobPosting.length; i++) {
               
               // getting users total month from joining date
               var dateOfJoin  = jobPosting[i].date_of_join;
               var currentDate = this.currentDate;
               let date1       = new Date(dateOfJoin);  let date2 = new Date(currentDate);  
               let years       = this.yearsDiff(dateOfJoin, currentDate);  
               let months      = (years * 12) + (date2.getMonth() - date1.getMonth()) ;

                this.merged.push({
                 ...jobPosting[i],
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
           this.usersDetails   = this.usersDetails.sort((a, b) => b.total_job_posting - a.total_job_posting);
         
           this.getLastSixWeeksJobOrder(this.usersDetails);
   
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


  getLastSixWeeksJobOrder(userDetails){
     this.targetService.getLastSixWeeksJobOrder().subscribe(
      resp => {
        
            if(resp['status_code'] == 200){
              this.lastSixWeeksJobOrder = resp['data'];

             var w1 = this.lastSixWeeksJobOrder['w1'];
             var w2 = this.lastSixWeeksJobOrder['w2'];
             var w3 = this.lastSixWeeksJobOrder['w3'];
             var w4 = this.lastSixWeeksJobOrder['w4'];
             var w5 = this.lastSixWeeksJobOrder['w5'];
             var w6 = this.lastSixWeeksJobOrder['w6'];

             for(let i=0; i<userDetails.length; i++) {
                if(w1.find((itmInner) => itmInner.id === userDetails[i].id)){
                   this.week1.push({
                   ...userDetails[i], 
                   ...(w1.find((itmInner) => itmInner.id === userDetails[i].id))}
                   );
                }else{
                  var firstWeekPosting = '0';
                  this.week1.push({
                   ...userDetails[i],
                   firstWeekPosting 
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
                    var secondWeekPosting = '0';
                     this.week2.push({
                     ...this.week1[i],
                     secondWeekPosting 
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
                    var thirdWeekPosting = '0';
                    this.week3.push({
                     ...this.week2[i], 
                     thirdWeekPosting
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
                  var fourthWeekPosting = '0';
                  this.week4.push({
                   ...this.week3[i],
                   fourthWeekPosting
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
                  var fifthWeekPosting = '0';
                  this.week5.push({
                   ...this.week4[i],
                   fifthWeekPosting 
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
                  var sixWeekPosting = '0';
                   this.week6.push({
                   ...this.week5[i],
                    sixWeekPosting
                   }
                  );
                }
                      
              }
             console.log('lastsix',this.week6);
            }else{
              this.lastSixWeeksJobOrder = '';
            }

      },
      
      error => this.errorMessage = <any>error
    );
  }



 

}
