import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { environment } from '../../environments/environment';
import { UserService } from 'src/app/_services/user.service';
import { PointsService } from 'src/app/_services/points.service'; 
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

  
  endDate:any;
  startDate:any;
  
  teamInfo:any;
  teamsSubmissions:any;
  teamsJoining:any;
  teamsInterviews:any;

  jobOrderPoints:any;
  submissionsPoints:any;
  interviewsPoints:any;
  joiningsPoints:any;

  lastSixWeeksPoints:any;
  
 
  merged        = [];
  teamsDetails  = [];
  pointsDetails = [];
  
  point    = [];
  point1   = [];
  point2   = [];

  week1    = [];
  week2    = [];
  week3    = [];
  week4    = [];
  week5    = [];
  week6    = [];

  teamsPoints: Array<{ team_id: number, total_points: any }> = [];
  finalPointsList:any;

  constructor(private targetService: TargetService,private userService: UserService,
    private pointsService: PointsService) { }

  

  ngOnInit() {
  	var date         = new Date();
    this.endDate     = moment(date).format('YYYY-MM-DD');
    this.startDate   = moment().startOf('year').format('YYYY-MM-DD');

    this.getSubmissions();
    this.getSubmissionsPoints();
    this.getLastSixWeekPoint();
    
  }

       // get job orders points according to teams
  //  getJobOrdersPoints(){

  //   this.pointsService.getJobOrdersPoints(this.yearStartDate,this.currentDate).subscribe(
  //     resp => {

  //        if(resp['status_code'] == 200){
  //          this.jobOrderPoints = resp['data'];


  //        }else{
  //          this.jobOrderPoints ='';
  //        }
         
         
  //     },
      
  //     error => this.errorMessage = <any>error
  //   );
  // }

     // get submissions points according to teams
   getSubmissionsPoints(){

     this.userService.teamList().subscribe(
      resp => {
        this.teamInfo = resp['data']; 


        this.pointsService.getSubmissionsPoints(this.startDate,this.endDate).subscribe(
          resp => {
           
             if(resp['status_code'] == 200){
               this.submissionsPoints = resp['data'];
             
                for(let i=0; i<this.teamInfo.length; i++) {
                    this.point.push({
                     ...this.teamInfo[i], 
                     ...(this.submissionsPoints.find((itmInner) => itmInner.team_id === this.teamInfo[i].id))}
                    );
                }
 
             }else{
                for(let i=0; i<this.teamInfo.length; i++) {
                    this.point.push({
                     ...this.teamInfo[i], 
                     }
                    );
                }
             }

            this.getInterviewsPoints(this.point);

          },
          
          error => this.errorMessage = <any>error
        );

      },
      
      error => this.errorMessage = <any>error
    );


  }


       // get interviews points according to teams
   getInterviewsPoints(submissionsPoints){

    this.pointsService.getInterviewsPoints(this.startDate,this.endDate).subscribe(
      resp => {
        
         if(resp['status_code'] == 200){
           this.interviewsPoints = resp['data'];

            for(let i=0; i<submissionsPoints.length; i++) {
              this.point1.push({
               ...submissionsPoints[i], 
               ...(this.interviewsPoints.find((itmInner) => itmInner.team_id === submissionsPoints[i].team_id))}
              );
            }

         }else{
            for(let i=0; i<submissionsPoints.length; i++) {
              this.point1.push({
               ...submissionsPoints[i]
               });
            }
         }
         
         this.getJoiningsPoints(this.point1);
      },
      
      error => this.errorMessage = <any>error
    );
  }


       // get Joinings points according to teams
   getJoiningsPoints(getPoints){

    this.pointsService.getJoiningsPoints(this.startDate,this.endDate).subscribe(
      resp => {

         if(resp['status_code'] == 200){
           this.joiningsPoints = resp['data'];
           for(let i=0; i<getPoints.length; i++) {
              this.point2.push({
               ...getPoints[i], 
               ...(this.joiningsPoints.find((itmInner) => itmInner.team_id === getPoints[i].team_id))}
              );
            }

         }else{
           for(let i=0; i<getPoints.length; i++) {
              this.point2.push({
               ...getPoints[i]
               });
            }
         }
         
          
         for(let i=0; i<this.point2.length; i++) {

           var submissions_points = 0;
           var interviews_points  = 0;
           var joinings_points    = 0;
           var totalPoints        = 0;

           if(this.point2[i].submissions_points){
             submissions_points = this.point2[i].submissions_points;
           }else{
             submissions_points = 0;
           }
           if(this.point2[i].interviews_points){
             interviews_points = this.point2[i].interviews_points;
           }else{
             interviews_points = 0;
           }
           if(this.point2[i].joinings_points){
             joinings_points = this.point2[i].joinings_points;
           }else{
             joinings_points = 0;
           }
           
           totalPoints = ((+submissions_points) + (+interviews_points) + (+joinings_points))/(+this.point2[i].users);
          
           this.teamsPoints.push({ 'team_id': this.point2[i].id, 'total_points': totalPoints });
         }
          this.finalPointsList   = this.teamsPoints.sort((a, b) => b.total_points - a.total_points);
         //console.log('tpoint',this.finalPointsList);

      },
      
      error => this.errorMessage = <any>error
    );
  }

  getSubmissions(){
  	 // call totalsubmission according to user
    this.targetService.getAllTeamsSubmissionsTotal(this.startDate,this.endDate).subscribe(
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
    this.targetService.getAllTeamsJoiningsTotal(this.startDate,this.endDate).subscribe(
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
    this.targetService.getAllTeamsInterviewsTotal(this.startDate,this.endDate).subscribe(
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
         
         console.log('temsdeta',this.teamsDetails);  
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
             ...(this.teamInfo.find((itmInner) => itmInner.id === teamDetails[i].team_id))
           }
             );
           }
           
          }
        // this.pointsDetails   = this.pointsDetails.sort((a, b) => b.totalPoints - a.totalPoints);
       
      },
      
      error => this.errorMessage = <any>error
    );
  }


  getLastSixWeekPoint(){

     this.userService.teamList().subscribe(
      resp => {
        this.teamInfo = resp['data']; 
      
        
            this.pointsService.getLastSixWeekPoint().subscribe(
             resp => {
                 if(resp['status_code'] == 200){

                   this.lastSixWeeksPoints = resp['data'];

                   var w1 = this.lastSixWeeksPoints['w1'];
                   var w2 = this.lastSixWeeksPoints['w2'];
                   var w3 = this.lastSixWeeksPoints['w3'];
                   var w4 = this.lastSixWeeksPoints['w4'];
                   var w5 = this.lastSixWeeksPoints['w5'];
                   var w6 = this.lastSixWeeksPoints['w6'];

                    for(let i=0; i<this.teamInfo.length; i++) {
                      if(w1.find((itmInner) => itmInner.team_id === this.teamInfo[i].id)){
                         this.week1.push({
                         ...this.teamInfo[i], 
                         ...(w1.find((itmInner) => itmInner.team_id === this.teamInfo[i].id))}
                         );
                      }else{
                        var firstWeekPoints = '0';
                        this.week1.push({
                         ...this.teamInfo[i],
                         firstWeekPoints 
                         }
                         );
                      }
                     
                    }


                    for(let i=0; i<this.week1.length; i++) {

                      if(w2.find((itmInner) => itmInner.team_id === this.week1[i].id)){
                        this.week2.push({
                         ...this.week1[i], 
                         ...(w2.find((itmInner) => itmInner.team_id === this.week1[i].id))}
                        );
                      }else{
                        var secondWeekPoints = '0';
                         this.week2.push({
                         ...this.week1[i],
                         secondWeekPoints 
                         }
                        );
                      }
                      
                    }

                    for(let i=0; i<this.week2.length; i++) {

                      if(w3.find((itmInner) => itmInner.team_id === this.week2[i].id)){
                        this.week3.push({
                         ...this.week2[i], 
                         ...(w3.find((itmInner) => itmInner.team_id === this.week2[i].id))}
                        );
                      }else{
                        var thirdWeekPoints = '0';
                        this.week3.push({
                         ...this.week2[i], 
                         thirdWeekPoints
                         }
                        );
                      }
                     
                    }

                    for(let i=0; i<this.week3.length; i++) {

                      if(w4.find((itmInner) => itmInner.team_id === this.week3[i].id)){
                        this.week4.push({
                         ...this.week3[i], 
                         ...(w4.find((itmInner) => itmInner.team_id === this.week3[i].id))}
                        );
                      }else{
                        var fourthWeekPoints = '0';
                        this.week4.push({
                         ...this.week3[i],
                         fourthWeekPoints
                         }
                        );
                      }
                      
                    }

                    for(let i=0; i<this.week4.length; i++) {

                      if(w5.find((itmInner) => itmInner.team_id === this.week4[i].id)){
                        this.week5.push({
                         ...this.week4[i], 
                         ...(w5.find((itmInner) => itmInner.team_id === this.week4[i].id))}
                        );
                      }else{
                        var fifthWeekPoints = '0';
                        this.week5.push({
                         ...this.week4[i],
                         fifthWeekPoints 
                         }
                        );
                      }
                      
                    }

                    for(let i=0; i<this.week5.length; i++) {

                      if(w6.find((itmInner) => itmInner.team_id === this.week5[i].id)){
                        this.week6.push({
                         ...this.week5[i], 
                         ...(w6.find((itmInner) => itmInner.team_id === this.week5[i].id))}
                        );
                      }else{
                        var sixWeekPoints = '0';
                         this.week6.push({
                         ...this.week5[i],
                          sixWeekPoints
                         }
                        );
                      }
                      
                    }
                 }else{
                   this.lastSixWeeksPoints ='';
                 }
               
               
              },
              
              error => this.errorMessage = <any>error
            );
         
      },
      
      error => this.errorMessage = <any>error
    );


  }

}
