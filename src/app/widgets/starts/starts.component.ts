import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-starts',
  templateUrl: './starts.component.html',
  styleUrls: ['./starts.component.css']
})
export class StartsComponent implements OnInit {
  iconUrl   = environment.uploadUrl;

  order: string = 'total_joining';

  errorMessage: any;
  teamsFlag = 1;
  usersFlag = 0;

  currentDate:any;
  yearStartDate:any;

  usersJoining:any;
  usersInterviews:any;
  usersJobPosting:any;

  merged = [];
  usersDetails = [];
  constructor(private targetService: TargetService) { }

  ngOnInit() {
  	var date             = new Date();
    this.currentDate     = moment(date).format('YYYY-MM-DD');
    this.yearStartDate   = moment().startOf('year').format('YYYY-MM-DD');
    this.getJoining();

  }

  // get joinings
  getJoining(){
  	// call users job posting 
    this.targetService.getJoining(this.yearStartDate,this.currentDate,this.usersFlag).subscribe(
      resp => {
           if(resp['status_code'] == 200){
           	 this.usersJoining = resp['data'];
           	 console.log('joining',this.usersJoining);
           	 this.getInterviews(this.usersJoining);
           	 
           	}else{
           	 this.usersJoining = '';
           	}
          
      },
      
      error => this.errorMessage = <any>error
    );
  }


    getInterviews(joinings){
  	// call users interviews
    this.targetService.getInterviews(this.yearStartDate,this.currentDate,this.usersFlag).subscribe(
      resp => {
           this.usersInterviews = resp['data'];
           console.log('interview',this.usersInterviews);
           for(let i=0; i<joinings.length; i++) {
    			  this.merged.push({
    			   ...joinings[i], 
    			   ...(this.usersInterviews.find((itmInner) => itmInner.id === joinings[i].id))}
    			  );
    			}

          this.getJobPosting(this.merged);
          console.log(this.merged);


      },
      
      error => this.errorMessage = <any>error
    );
  }



  getJobPosting(mergeResult){
  	// call teams interviews
    this.targetService.getJobPosting(this.yearStartDate,this.currentDate,this.usersFlag).subscribe(
      resp => {
           this.usersJobPosting = resp['data'];
           console.log('jobpost',this.usersJobPosting);
           for(let i=0; i<mergeResult.length; i++) {
           	  var strikeRate = Math.round((mergeResult[i].total_joining*100)/this.usersJobPosting[i].total_job_posting);

    			  this.usersDetails.push({
    			   ...mergeResult[i], 
    			   ...(this.usersJobPosting.find((itmInner) => itmInner.id === mergeResult[i].id)),
                   strikeRate
    			}
    			  );
    			}

          console.log('teee',this.usersDetails);


      },
      
      error => this.errorMessage = <any>error
    );
  }

}
