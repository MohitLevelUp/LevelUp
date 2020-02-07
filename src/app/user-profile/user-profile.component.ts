import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { KpiService } from 'src/app/_services/kpi.service';
import { TargetService } from 'src/app/_services/target.service';
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

  assignTargetData: Array<{ kpi_id: number, kpi_name: string, formula: number, point: number,
   weightage: number, target_period: number, total:number, users_target:number, targetResultPercentage: number }> = [];

  constructor(private targetService: TargetService, private userService: UserService,private kpiService: KpiService,) { }

  ngOnInit() {
   const helper         = new JwtHelperService();
   const authToken      = localStorage.getItem('authToken');
   const decodedToken   = helper.decodeToken(authToken);
   var userID           = decodedToken['user_id'];
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
        this.targetList = resp['data'];
        console.log(this.targetList);
        var flag:number = 0;
        var foo:number  = 0;
        for (let i = 0; i < this.targetList.length; i++) {
         var assignTarget   = this.targetList[i].users_target; 
         var completeTarget = this.targetList[i].total; 

         var targetResult   = assignTarget - completeTarget;

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
        this.pointDifference = (allAssignTarget - allCompleteTarget);
        
      },
      
      error => this.errorMessage = <any>error
    );

  }

}
