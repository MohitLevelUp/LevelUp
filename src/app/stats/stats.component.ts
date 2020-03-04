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

  
  endDate:any;
  startDate:any;
  
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
    this.endDate     = moment(date).format('YYYY-MM-DD');
    this.startDate   = moment().startOf('year').format('YYYY-MM-DD');

    this.getSubmissions();
    this.getLastFiveWeekPoint();
    
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

        var submissionsPoints = 0;
        var interviewsPoints  = 0;
        var startsPoints      = 0;
        var totalPoints       = 0;

        for(let i=0; i<teamDetails.length; i++) {
          
           if(this.teamInfo.find((itmInner) => itmInner.id === teamDetails[i].team_id)){
              if(teamDetails[i].total_submission){
                submissionsPoints = (+teamDetails[i].total_submission * 100)/ (+this.teamInfo[i].users);
                console.log('sub',submissionsPoints);
              }else{
                submissionsPoints = 0;
              }
              if(teamDetails[i].total_interviews){
                interviewsPoints = (+teamDetails[i].total_interviews * 100)/ (+this.teamInfo[i].users);
                console.log('interview',interviewsPoints);
              }else{
                interviewsPoints = 0;
              }
              if(teamDetails[i].total_joining){
                startsPoints = (+teamDetails[i].total_joining * 200)/ (+this.teamInfo[i].users);
                console.log('start',startsPoints);
              }else{
                startsPoints = 0;
              }
              totalPoints = (submissionsPoints + interviewsPoints + startsPoints);
              console.log('totl',totalPoints);
              console.log('team_id',teamDetails[i].team_id);
              this.pointsDetails.push({
             ...teamDetails[i], 
             ...(this.teamInfo.find((itmInner) => itmInner.id === teamDetails[i].team_id)),
             totalPoints
           }
             );
           }
           
          }
        this.pointsDetails   = this.pointsDetails.sort((a, b) => b.totalPoints - a.totalPoints);
        console.log(this.teamInfo);
        console.log('details',this.pointsDetails);
      },
      
      error => this.errorMessage = <any>error
    );
  }


  getLastFiveWeekPoint(){

     for(var i=6; i>=1; i--){
        var startDate   = (moment().subtract(i, 'weeks').startOf('week').format('YYYY-MM-DD'));
        var endDate     = (moment().subtract(i, 'weeks').endOf('week').format('YYYY-MM-DD'));
        
        console.log('l_sd',startDate);
        console.log('l_ed',endDate);
     }

  }

}
