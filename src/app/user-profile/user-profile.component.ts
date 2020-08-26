import { Component, OnInit } from '@angular/core';  
import { IUser } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { KpiService } from 'src/app/_services/kpi.service'; 
import { TargetService } from 'src/app/_services/target.service';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { PointsService } from 'src/app/_services/points.service';
import * as moment from 'moment'; 
import { JwtHelperService  }  from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  errorMessage: any;
  targetList:any;
  pointDifference:any;
  
  teamWorkTotal:any;
  teamWorkLevel:any;
  
  rockStarTotal:any;
  rockStarTotalPoint:any;
  rockStarLevel:any;
  totalPoint:any = 0;

  mostValuable:any;
  mostValuablePoint:any;
  playerLevel:any;

  startDate:any;
  endDate:any;

  assignTargetData: Array<{ kpi_id: number, kpi_name: string, formula: number, point: number,
   weightage: number, target_period: number, total:number, users_target:number, targetResultPercentage: number }> = [];

  constructor(private targetService: TargetService,
   private userService: UserService,private kpiService: KpiService,
   private coreValueService: CoreValueService,private pointsService: PointsService) { }

  ngOnInit() {

   var date             = new Date();
   this.endDate         = moment(date).format('YYYY-MM-DD');
   this.startDate       = moment().startOf('year').format('YYYY-MM-DD');

   var userProfile      = JSON.parse(localStorage.getItem('user'));
   var userID           = userProfile['user_id'];
   var speciality       = userProfile['speciality'];

     //get user details
    this.userService.getUser(userID).subscribe(
      resp => {
        this.userInfo = resp['data'];
      },
      
      error => this.errorMessage = <any>error
    );

    //get user's target list
    
    this.targetService.getUsersTargetList(userID).subscribe(
      resp => {
        if(resp['status_code'] == 200){
          this.targetList    = resp['data'];

          var flag:number    = 0;
          var foo:number     = 0;
          var totalPoint     = 0;
          var completedPoint = 0;

          for (let i = 0; i < this.targetList.length; i++) {

           totalPoint     = (+totalPoint) + (+this.targetList[i].point);

           var gotPoint   = ((+this.targetList[i].total) * (+this.targetList[i].point))/(+this.targetList[i].users_target);
          
           if(gotPoint > +this.targetList[i].point){
            
             gotPoint = +this.targetList[i].point;
           }

           completedPoint = (+completedPoint) + gotPoint;
           

           var assignTarget   = +this.targetList[i].users_target; 
           var completeTarget = +this.targetList[i].total; 

           var targetResult   = completeTarget - assignTarget ;

           var targetResultPercentage = Math.round((targetResult*100)/assignTarget);


           //user's in all kpi assign target total


           var allAssignTarget:any = +flag + (+assignTarget * this.targetList[i].point) ; //+ sign conver string to number

                          flag = allAssignTarget;
                          

            //user's completed taget

            var allCompleteTarget:any = +foo + (+completeTarget * this.targetList[i].point);

                              foo = allCompleteTarget;

            this.assignTargetData.push({ 'kpi_id': this.targetList[i].kpi_id, 'kpi_name': this.targetList[i].kpi_name, 
              'formula': this.targetList[i].formula, 'point': this.targetList[i].point, 'weightage': this.targetList[i].weightage,
               'target_period': this.targetList[i].target_period, 'total': this.targetList[i].total, 'users_target': this.targetList[i].users_target, 'targetResultPercentage': targetResultPercentage});

        }

        this.pointDifference = (totalPoint - completedPoint);
      }else{
        this.targetList = '';
      }
        
        
      },
      
      error => this.errorMessage = <any>error
    );


     //get user's received team work core value stickers total
    this.coreValueService.getTeamWorkTotalReceived(userID).subscribe(
      resp => {
        
        if(resp['status_code'] == 200){
           this.teamWorkTotal = resp['data'];
           this.totalPoint    = (+this.teamWorkTotal['total'] * 100);
           this.teamWorkLevel = Math.floor(this.totalPoint/200);
             // if(level > 0){
             //   this.teamWorkLevel     = 'Level ' + level;
             // }else{
             //   this.teamWorkLevel     = '';
             // }
        }else{
           this.teamWorkTotal = '';
         
        }
        
      },
      
      error => this.errorMessage = <any>error
    );

    if(speciality == 2){

       //get user's submissions points
       this.pointsService.getSubmissionsPoints(this.startDate,this.endDate,userID).subscribe(
        resp => {
          if(resp['status_code'] == 200){

             this.rockStarTotal       = resp['data'];
             this.rockStarTotalPoint  = (+this.rockStarTotal[0]['submissions_points']);
             this.rockStarLevel       = Math.floor(this.rockStarTotalPoint/400);
             // if(level > 0){
             //   this.rockStarLevel       = 'Level ' + level;
             // }else{
             //   this.rockStarLevel     = '';
             // }
             

          }else{
             this.rockStarTotal = '';
           
          }
          
        },
        
        error => this.errorMessage = <any>error
      );
    }else{
      //get user's job orders points 
       this.pointsService.getJobOrdersPoints(this.startDate,this.endDate,userID).subscribe(
        resp => {
          if(resp['status_code'] == 200){

             this.rockStarTotal       = resp['data'];
             this.rockStarTotalPoint  = (+this.rockStarTotal[0]['job_order_points']);
             this.rockStarLevel       = Math.floor(this.rockStarTotalPoint/400);
             // if(level > 0){
             //   this.rockStarLevel     = 'Level ' + level;
             // }else{
             //   this.rockStarLevel     = '';
             // }
             
          }else{
             this.rockStarTotal = '';
           
          }
          
        },
        
        error => this.errorMessage = <any>error
      );
    }

    //get user's joinings points 
       this.pointsService.getJoiningsPoints(this.startDate,this.endDate,userID).subscribe(
        resp => {

          if(resp['status_code'] == 200){

             this.mostValuable        = resp['data'];
             this.mostValuablePoint   = (+this.mostValuable[0]['joinings_points']);
             this.playerLevel         = Math.floor(this.mostValuablePoint/400);
             // if(level > 0){
             //   this.playerLevel       = 'Level ' + level;
             // }else{
             //   this.playerLevel       = '';
             // }
             
          }else{
             this.mostValuable        = '';
           
          }
          
        },
        
        error => this.errorMessage = <any>error
      );
    



  }



}
