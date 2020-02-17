import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-most-job-orders',
  templateUrl: './most-job-orders.component.html',
  styleUrls: ['./most-job-orders.component.css']
})
export class MostJobOrdersComponent implements OnInit {
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
    this.getJobPosting();
  }

   getJobPosting(){
  	// call teams interviews
    this.targetService.getJobPosting(this.yearStartDate,this.currentDate,this.usersFlag).subscribe(
      resp => {
             if(resp['status_code'] == 200){
	           	 this.usersJobPosting = resp['data'];
	           	 console.log('post',this.usersJobPosting);
	           	 this.getInterviews(this.usersJobPosting);
           	 
	           	}else{
	           	 this.usersJobPosting = '';
	           	}

       //     for(let i=0; i<mergeResult.length; i++) {
       //     	  var strikeRate = Math.round((mergeResult[i].total_joining*100)/this.usersJobPosting[i].total_job_posting);

    			//   this.usersDetails.push({
    			//    ...mergeResult[i], 
    			//    ...(this.usersJobPosting.find((itmInner) => itmInner.id === mergeResult[i].id)),
       //             strikeRate
    			// }
    			//   );
    			// }

          // console.log('teee',this.usersDetails);


      },
      
      error => this.errorMessage = <any>error
    );
  }

  getInterviews(jobPosting){
  	// call users interviews
    this.targetService.getInterviews(this.yearStartDate,this.currentDate,this.usersFlag).subscribe(
      resp => {
           this.usersInterviews = resp['data'];
           console.log('int',this.usersInterviews);
           for(let i=0; i<jobPosting.length; i++) {
    			  this.merged.push({
    			   ...jobPosting[i], 
    			   ...(this.usersInterviews.find((itmInner) => itmInner.id === jobPosting[i].id))}
    			  );
    			}
           console.log('mer',this.merged);
          this.getJoining(this.merged);


      },
      
      error => this.errorMessage = <any>error
    );
  }

  // get joinings
  getJoining(mergeResult){
  	// call users job posting 
    this.targetService.getJoining(this.yearStartDate,this.currentDate,this.usersFlag).subscribe(
      resp => {

           	 this.usersJoining = resp['data'];
           	 console.log('st',this.usersJoining);

           	 for(let i=0; i<mergeResult.length; i++) {
           	 
           	 	if(this.usersJoining[i].total_joining){
           	 		console.log(this.usersJoining[i]['total_joining']);
           	 		
           	 	}else{
           	 		console.log('hii');
           	 	}
           	 	
       //     	  var strikeRate = Math.round((this.usersJoining[i].total_joining*100)/mergeResult[i].total_job_posting);

    			//   this.usersDetails.push({
    			//    ...mergeResult[i], 
    			//    ...(this.usersJoining.find((itmInner) => itmInner.id === mergeResult[i].id)),
       //             strikeRate
    			// }
    			//   );
    			}

          // console.log('teee',this.usersDetails);
   
      },
      
      error => this.errorMessage = <any>error
    );
  }


    



 

}
