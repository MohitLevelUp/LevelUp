import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppraisalService } from 'src/app/_services/appraisal.service';
import { UserService } from 'src/app/_services/user.service';
import { PointsService } from 'src/app/_services/points.service';
import { NgForm } from '@angular/forms';
import { NotifierService } from "angular-notifier";
import * as moment from 'moment'; 

@Component({
  selector: 'app-edit-appraisal',
  templateUrl: './edit-appraisal.component.html',
  styleUrls: ['./edit-appraisal.component.css']
})
export class EditAppraisalComponent implements OnInit {
  
  selectedPeriod      = '';
  selectedEmployee    = '';
  selectedreportingTo = '';

  appraisalDetails:any;
  usersInfo:any;
  successMessage: any;
  errorMessage: any;

  submissionsPoints:any;
  jobOrdersPoints:any;
  interviewsPoints:any;
  joiningsPoints:any;

  private readonly notifier: NotifierService;

  constructor(private route: ActivatedRoute,private appraisalService: AppraisalService,
  	private userService: UserService,private pointsService: PointsService,notifierService: NotifierService) { 
    this.notifier = notifierService;
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

  ngOnInit() {
    // calling get user list function
    this.getUserList();

  	this.route.params.subscribe(params => {
        var appraisalId = params['id'];
        
        // getting appraisal details throw by appraisal id

        this.appraisalService.appraisalDetails(appraisalId).subscribe(
	      resp => {
	      	
	        this.appraisalDetails    = resp['data']; 
	        console.log(this.appraisalDetails);
	        this.selectedPeriod      = this.appraisalDetails['appraisal_period'];
	        this.selectedEmployee    = this.appraisalDetails['user_id'];
            this.selectedreportingTo = this.appraisalDetails['reporting_to'];; 
	      },
	      
	      error => this.errorMessage = <any>error
	    );

    });


  }

// update appraisal

  updateAppraisal(form: NgForm) {
    var userId          = form.value['employeeName'];
    var appraisalPeriod = form.value['appraisalPeriod'];
    console.log('period',appraisalPeriod);
    
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


    
   
    this.getSubmissionsPoints(startDate,endDate,userId);
    
    // this.appraisalService.updateAppraisal(form.value).subscribe(
    //   res => {
        
    //     if(res['status_code'] == 200){
           
    //         this.successMessage = res['message'];
    //            this.notifier.show({
    //               type: "success",
    //               message: this.successMessage,
    //            });
    //     }else{
    //            this.errorMessage = res['message'];
    //            this.notifier.show({
    //               type: "error",
    //               message: this.errorMessage,
    //            });
    //         }
         
    //   },
    //   error => this.errorMessage = <any>error
    // );
  }



  // get submissions points
   getSubmissionsPoints(startDate:any,endDate:any,userId:any){
        this.pointsService.getSubmissionsPoints(startDate,endDate,userId).subscribe(
          resp => {
          	console.log('subp',resp);
             if(resp['status_code'] == 200){
               this.submissionsPoints = resp['data'];
               var userSubPoints = this.submissionsPoints[0].submissions_points;
 
             }else{
                userSubPoints = 0;
             }

             this.getJobOrdersPoints(startDate,endDate,userId,userSubPoints);

          },
          
          error => this.errorMessage = <any>error
        );

  }

  // get joborders points 
   getJobOrdersPoints(startDate:any,endDate:any,userId:any,userSubPoints:any){
        this.pointsService.getJobOrdersPoints(startDate,endDate,userId).subscribe(
          resp => {
          	console.log('jobor',resp);
             if(resp['status_code'] == 200){
               this.jobOrdersPoints = resp['data'];
                var userJobOrdersPoints   = (+userSubPoints) + (+this.jobOrdersPoints[0].job_order_points);
 
             }else{
                 userJobOrdersPoints = userSubPoints;
             }

             this.getInterviewsPoints(startDate,endDate,userId,userJobOrdersPoints);

          },
          
          error => this.errorMessage = <any>error
        );

  }

// getting user's interview points
  getInterviewsPoints(startDate:any,endDate:any,userId:any,userJobOrdersPoints:any){

    this.pointsService.getInterviewsPoints(startDate,endDate,userId).subscribe(
      resp => {
        console.log('intp',resp);
         if(resp['status_code'] == 200){
           this.interviewsPoints = resp['data'];
           var userinterviewsPoints   = (+userJobOrdersPoints) + (+this.interviewsPoints[0].interviews_points);
 

         }else{
            userinterviewsPoints = userJobOrdersPoints;
         }
         
         this.getJoiningsPoints(startDate,endDate,userId,userinterviewsPoints);
      },
      
      error => this.errorMessage = <any>error
    );
  }


         // get Joinings points 
   getJoiningsPoints(startDate:any,endDate:any,userId:any,userinterviewsPoints:any){

    this.pointsService.getJoiningsPoints(startDate,endDate,userId).subscribe(
      resp => {
         console.log('joinp',resp);
         if(resp['status_code'] == 200){
           this.joiningsPoints = resp['data'];
           var usertotalPoints   = (+userinterviewsPoints) + (+this.joiningsPoints[0].joinings_points);
 
         }else{
            usertotalPoints = userinterviewsPoints;
         }

         console.log('totalp', usertotalPoints);
      },
      
      error => this.errorMessage = <any>error
    );
  }

 

}
