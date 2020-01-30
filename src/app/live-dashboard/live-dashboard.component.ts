import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
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
   submissionstopers:any;
   jobPostingtopers:any;
   joiningtopers:any;
   errorMessage: any;

   startDate:any;
   currentDate:any;

  constructor(private targetService: TargetService) { }

  ngOnInit() { 

  	// get total submissions
    var date         = new Date();
    this.currentDate = moment(date).format('YYYY-MM-DD');

    this.startDate   = '2020-01-01';

    // call totalsubmission 
    this.targetService.totalSubmission(this.startDate,this.currentDate).subscribe(
      resp => {
        
         this.userSubmissions = resp['data'];
         this.submissionstopers = this.userSubmissions.sort((a, b) => b.total_submission - a.total_submission).slice(0,3)

      },
      
      error => this.errorMessage = <any>error
    );

    // call total job posting
    this.targetService.totalJobPosting(this.startDate,this.currentDate).subscribe(
      resp => {
        
         this.userJobPosting = resp['data'];

         this.jobPostingtopers = this.userJobPosting.sort((a, b) => b.total_job_posting - a.total_job_posting).slice(0,3)

      },
      
      error => this.errorMessage = <any>error
    );


    // call totaljoining
    this.targetService.totalJoining(this.startDate,this.currentDate).subscribe(
      resp => {
        
         this.userJoining = resp['data'];
         this.joiningtopers = this.userJoining.sort((a, b) => b.total_joining - a.total_joining).slice(0,3)

      },
      
      error => this.errorMessage = <any>error
    );

    

    // get submission total
    this.targetService.getSubmissionsTotal(this.startDate,this.currentDate).subscribe(
      resp => {
         
         this.totalSubmissions = resp['data'].total_submission;
        
      },
      
      error => this.errorMessage = <any>error
    );

    // get job posting total
    this.targetService.getJobPostingTotal(this.startDate,this.currentDate).subscribe(
      resp => {
         
         this.totalJobPosting = resp['data'].total_job_posting;
        
      },
      
      error => this.errorMessage = <any>error
    );

    // get joining total
    this.targetService.getJoiningTotal(this.startDate,this.currentDate).subscribe(
      resp => {
         
         this.totalJoining = resp['data'].total_joinings;
        
      },
      
      error => this.errorMessage = <any>error
    );

    // get interview total
    this.targetService.getInterviewTotal(this.startDate,this.currentDate).subscribe(
      resp => {
         
         this.totalInterview = resp['data'].total_interview;
        
      },
      
      error => this.errorMessage = <any>error
    );


  }

}
