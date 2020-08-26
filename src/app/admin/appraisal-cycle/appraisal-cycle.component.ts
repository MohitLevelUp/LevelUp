import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AppraisalService } from 'src/app/_services/appraisal.service';
import { UserService } from 'src/app/_services/user.service';
import { PointsService } from 'src/app/_services/points.service';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotifierService } from "angular-notifier";
import * as moment from 'moment'; 

@Component({
  selector: 'app-appraisal-cycle',
  templateUrl: './appraisal-cycle.component.html',
  styleUrls: ['./appraisal-cycle.component.css']
})
export class AppraisalCycleComponent implements OnInit {

  appraisalmodel: any = {};

  selectedreportingTo = '';
  selectedPeriod = '';
  selectedEmployee = '';

  point_percentage:any = 0;

  private readonly notifier: NotifierService;
  
  usersInfo:any;
  hikePercentages:any;
  successMessage: any;
  errorMessage: any;

  submissionsPoints:any;
  jobOrdersPoints:any;
  interviewsPoints:any;
  joiningsPoints:any;

  constructor(private appraisalService: AppraisalService,
  	private userService: UserService,private pointsService: PointsService, 
  	notifierService: NotifierService) {
   this.notifier = notifierService;
   }

  ngOnInit() {

    //getting hike percentage
    this.appraisalService.hikePercentage().subscribe(
      resp => {
        this.hikePercentages = resp['data']; 
      },
      error => this.errorMessage = <any>error
    );
  	this.getUserList();
  }

 //start user function
  getUserList(){
    //get all user's details
    this.userService.userList().subscribe(
      resp => {
        this.usersInfo = resp['data']; 
      },
      error => this.errorMessage = <any>error
    );
  }


// add appraisal start
  addAppraisal(form: NgForm) {

    this.appraisalService.addAppraisal(form.value).subscribe(
      (resp) => {
        if(resp['status_code'] == 200){

          this.successMessage = resp.message;
           this.notifier.show({
              type: "success",
              message: this.successMessage,
           });
        }else{
           this.errorMessage = resp.message;
           this.notifier.show({
              type: "error",
              message: this.errorMessage,
           });
        }
      },
      error => {
         this.errorMessage = <any>error
      }

    );
    form.resetForm();
    this.selectedreportingTo = '';
    this.selectedPeriod = '';
    this.selectedEmployee = '';
  }


  periodSelected(value:string){
    $(".period_select").attr( "link", value );
    this.selectedEmployee = '';  
    $( ".target_points" ).empty();
  }

  employeeSelected(value:string){

    var userId          = value;
    var appraisalPeriod = $(".period_select").attr( "link"); 

    if(appraisalPeriod == 'Monthly'){
      var targetPoints = 2000;
    }else if(appraisalPeriod == 'Quarterly'){
      var targetPoints = 6000;
    }else if(appraisalPeriod == 'Half Yearly'){
      var targetPoints = 12000;
    }else if(appraisalPeriod == 'Yearly'){
      var targetPoints = 24000;
    }

    if(appraisalPeriod != ""){
      $( ".target_points" ).empty().append( "<strong>" + targetPoints +"</strong>" );
    
    
      if(appraisalPeriod == 'Monthly'){
          var startDate    = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
          var endDate      = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      
      }else if(appraisalPeriod == 'Quarterly'){
          var quarterAdjustment     = (moment().month() % 3) + 1;
          var lastQuarterEndDate    = moment().subtract({ months: quarterAdjustment }).endOf('month');
          var lastQuarterStartDate  = lastQuarterEndDate.clone().subtract({ months: 3 }).startOf('month');
          var startDate             = lastQuarterStartDate.format('YYYY-MM-DD');
          var endDate               = lastQuarterEndDate.format('YYYY-MM-DD');

      }else if(appraisalPeriod == 'Yearly'){
          var startDate     = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
          var endDate       = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');

      }

      this.getSubmissionsPoints(startDate,endDate,userId,targetPoints);
    }
    

  }


   // get submissions points
   getSubmissionsPoints(startDate:any,endDate:any,userId:any,targetPoints:any){
        this.pointsService.getSubmissionsPoints(startDate,endDate,userId).subscribe(
          resp => {
            console.log('subp',resp);
             if(resp['status_code'] == 200){
               this.submissionsPoints = resp['data'];
               var userSubPoints = this.submissionsPoints[0].submissions_points;
 
             }else{
                userSubPoints = 0;
             }

             this.getJobOrdersPoints(startDate,endDate,userId,userSubPoints,targetPoints);

          },
          
          error => this.errorMessage = <any>error
        );

  }

  // get joborders points 
   getJobOrdersPoints(startDate:any,endDate:any,userId:any,userSubPoints:any,targetPoints:any){
        this.pointsService.getJobOrdersPoints(startDate,endDate,userId).subscribe(
          resp => {
            console.log('jobor',resp);
             if(resp['status_code'] == 200){
               this.jobOrdersPoints = resp['data'];
                var userJobOrdersPoints   = (+userSubPoints) + (+this.jobOrdersPoints[0].job_order_points);
 
             }else{
                 userJobOrdersPoints = userSubPoints;
             }

             this.getInterviewsPoints(startDate,endDate,userId,userJobOrdersPoints,targetPoints);

          },
          
          error => this.errorMessage = <any>error
        );

  }

// getting user's interview points
  getInterviewsPoints(startDate:any,endDate:any,userId:any,userJobOrdersPoints:any,targetPoints:any){

    this.pointsService.getInterviewsPoints(startDate,endDate,userId).subscribe(
      resp => {
        console.log('intp',resp);
         if(resp['status_code'] == 200){
           this.interviewsPoints = resp['data'];
           var userinterviewsPoints   = (+userJobOrdersPoints) + (+this.interviewsPoints[0].interviews_points);
 

         }else{
            userinterviewsPoints = userJobOrdersPoints;
         }
         
         this.getJoiningsPoints(startDate,endDate,userId,userinterviewsPoints,targetPoints);
      },
      
      error => this.errorMessage = <any>error
    );
  }


         // get Joinings points 
   getJoiningsPoints(startDate:any,endDate:any,userId:any,userinterviewsPoints:any,targetPoints:any){

    this.pointsService.getJoiningsPoints(startDate,endDate,userId).subscribe(
      resp => {
         console.log('joinp',resp);
         if(resp['status_code'] == 200){
           this.joiningsPoints = resp['data'];
           var usertotalPoints   = (+userinterviewsPoints) + (+this.joiningsPoints[0].joinings_points);
 
         }else{
            usertotalPoints = userinterviewsPoints;
         }

         var achievedPercentage = (+usertotalPoints * 100) / (+targetPoints);

         this.point_percentage  = achievedPercentage;

         $( ".achieved_points" ).empty().append( "<strong>" + usertotalPoints +"</strong>" );
         $( ".achieved_percentage" ).empty().append( "<strong>" + achievedPercentage +"%</strong>" );
          },
      
      error => this.errorMessage = <any>error
    );
  }


}
