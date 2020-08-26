import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-live-dashboard',
  templateUrl: './live-dashboard.component.html',
  styleUrls: ['./live-dashboard.component.css']
})
export class LiveDashboardComponent implements OnInit {
   iconUrl   = environment.uploadUrl;

   totalSubmissions: any;
   totalJobPosting:any;
   totalJoining: any;
   totalInterview:any;
   userSubmissions: any;
   userJobPosting:any;
   userJoining: any;

   teamsJobPosting: any;
   teamJobPostingtopers:any;

   submissionstopers:any;
   usersJobPostingtopers:any;
   joiningtopers:any;
   errorMessage: any;

   yearStartDate:any;
   currentDate:any;

   weekStartDate:any;
   weekEndDate:any;
   weeklyTotalSubmissions:any;
   weeklyTotalJoining:any;
   weeklyTotalJobPosting:any;

   tierOneTotalJoining:any;
   directClientTotalJoining:any;
   
   coreValues:any;
   coreValueTopers:any;

  constructor(private targetService: TargetService,
    private coreValueService: CoreValueService,) { }

  ngOnInit() { 
    var teamsFlag = 1;
    var usersFlag = 0;
    var teamId    = '';
    
    var withoutAnyType   = '';
    var tierOneType      = 1;
    var directClientType = 2;

    // get total submissions
    var date             = new Date();
    this.currentDate     = moment(date).format('YYYY-MM-DD');
    this.yearStartDate   = moment().startOf('year').format('YYYY-MM-DD');

    var quarterStartDate = moment().startOf('quarter').format('YYYY-MM-DD');
    var quarterEndDate   = moment().endOf('quarter').format('YYYY-MM-DD');




    // call totalsubmission according to user
    this.targetService.getSubmission(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
         this.userSubmissions = resp['data'];
         this.submissionstopers = this.userSubmissions.sort((a, b) => b.total_submission - a.total_submission).slice(0,3)

      },
      
      error => this.errorMessage = <any>error
    );

    // call teams job posting 
    this.targetService.getAllTeamsJobPostingTotal(this.yearStartDate,this.currentDate).subscribe(
      resp => {
        
         this.teamsJobPosting = resp['data'];

         this.teamJobPostingtopers = this.teamsJobPosting.sort((a, b) => b.total_job_posting - a.total_job_posting).slice(0,3)

      },
      
      error => this.errorMessage = <any>error
    );

    // call users job posting
    this.targetService.getJobPosting(this.yearStartDate,this.currentDate,teamId).subscribe(
      resp => {
        
         this.userJobPosting = resp['data'];

         this.usersJobPostingtopers = this.userJobPosting.sort((a, b) => b.total_job_posting - a.total_job_posting).slice(0,3)

      },
      
      error => this.errorMessage = <any>error
    );


    // call totaljoining
    // this.targetService.totalJoining(this.yearStartDate,this.currentDate).subscribe(
    //   resp => {
        
    //      this.userJoining = resp['data'];
    //      console.log('joi',this.userJoining);
    //      this.joiningtopers = this.userJoining.sort((a, b) => b.total_joining - a.total_joining).slice(0,3)

    //   },
      
    //   error => this.errorMessage = <any>error
    // );

    
   // ***** START ***** getting data this year  *****// 


    // get submission total for current year
    this.targetService.getSubmissionsTotal(this.yearStartDate,this.currentDate).subscribe(
      resp => {
         
         this.totalSubmissions = resp['data'].total_submission;
        
      },
      
      error => this.errorMessage = <any>error
    );

    // get job posting total for current year
    this.targetService.getJobPostingTotal(this.yearStartDate,this.currentDate).subscribe(
      resp => {
         
         this.totalJobPosting = resp['data'].total_job_posting;
        
      },
      
      error => this.errorMessage = <any>error
    );

    // get tier 1 and direct client total joining from year start date to current date
    this.targetService.getJoiningTotal(this.yearStartDate,this.currentDate, withoutAnyType).subscribe(
      resp => {
         this.totalJoining = resp['data'].total_joinings;
      },
      
      error => this.errorMessage = <any>error
    );


    // get tier 1 total joining of current quarter
    this.targetService.getJoiningTotal(quarterStartDate,quarterEndDate, tierOneType).subscribe(
      resp => {
         this.tierOneTotalJoining = resp['data'].total_joinings;

      },
      
      error => this.errorMessage = <any>error
    );


    // get direct Client total joining of current quarter
    this.targetService.getJoiningTotal(quarterStartDate,quarterEndDate, directClientType).subscribe(
      resp => {
         this.directClientTotalJoining = resp['data'].total_joinings;

      },
      
      error => this.errorMessage = <any>error
    );

   


    // ***** END ***** getting data this year  *****// 


    // ***** START ***** getting data this Week  *****//
     var currentDate     = moment();

     var  w_start        = currentDate.clone().startOf('week');
     this.weekStartDate  = moment(w_start).format('YYYY-MM-DD');
     var w_End           = currentDate.clone().endOf('week');
     this.weekEndDate    = moment(w_End).format('YYYY-MM-DD');

     // get interview total for current week
    this.targetService.getInterviewTotal(this.weekStartDate,this.weekEndDate).subscribe(
      resp => {
         
         this.totalInterview = resp['data'].total_interview;
        
      },
      
      error => this.errorMessage = <any>error
    );


     // get submission total for current week
    this.targetService.getSubmissionsTotal(this.weekStartDate,this.weekEndDate).subscribe(
      resp => {
         
         this.weeklyTotalSubmissions = resp['data'].total_submission;

        
      },
      
      error => this.errorMessage = <any>error
    );


    // get job posting total for current week
    this.targetService.getJobPostingTotal(this.weekStartDate,this.weekEndDate).subscribe(
      resp => {
         
         this.weeklyTotalJobPosting = resp['data'].total_job_posting;
        
      },
      
      error => this.errorMessage = <any>error
    );



    // get joining total for current week
    this.targetService.getJoiningTotal(this.weekStartDate,this.weekEndDate,withoutAnyType).subscribe(
      resp => {
         
         this.weeklyTotalJoining = resp['data'].total_joinings;
        
      },
      
      error => this.errorMessage = <any>error
    );



      // get core value topers list of current quarter
    this.coreValueService.getCoreValueTopers(quarterStartDate,quarterEndDate).subscribe(
      resp => {
         this.coreValues      = resp['data'];
         this.coreValueTopers = this.coreValues.sort((a, b) => b.total_coreValue - a.total_coreValue).slice(0,3)
        
      },
      
      error => this.errorMessage = <any>error
    );

  }





}
