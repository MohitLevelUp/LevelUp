import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  iconUrl   = environment.uploadUrl;

  topThree      : any;
  lastYearToper: any;
  monthJoinings : any;
  totalSubmissions : any;
  lastYearTotalSubmissions : any;
  errorMessage: any;

  yearStartDate:any;
  currentDate:any;

  // arr: Array<{ teamID: number, total: any }> = [];
  // submissionSum: any = [];

  constructor(private targetService: TargetService,) { }

  ngOnInit() {
    
   //get all user's current month submissions total according to team
    // var nowdate       = new Date();
    // var monthStartDay = new Date(nowdate.getFullYear(), nowdate.getMonth(), 1);
    // var monthEndDay   = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);

    // var month_sd = moment(monthStartDay).format('YYYY-MM-DD');
    // var month_ed = moment(monthEndDay).format('YYYY-MM-DD');

    var date             = new Date();
    this.currentDate     = moment(date).format('YYYY-MM-DD');
    this.yearStartDate   = moment().startOf('year').format('YYYY-MM-DD');

    var teamsFlag = 1;
    var usersFlag = 0;
    this.targetService.getSubmission(this.yearStartDate,this.currentDate,teamsFlag).subscribe(
      resp => {
        
         this.totalSubmissions = resp['data'];

      },
      
      error => this.errorMessage = <any>error
    );

    //get all user's current month joining
    this.targetService.getJoining(this.yearStartDate,this.currentDate,teamsFlag).subscribe(
      resp => {
      
        this.monthJoinings = resp['data'];
        this.topThree      = this.monthJoinings.sort((a, b) => b.total_joining - a.total_joining).slice(0,3)


      },
      
      error => this.errorMessage = <any>error
    );

    // get 2019 submissions

    var year_sd = '2019-01-01';
    var year_ed = '2019-12-31';

    this.targetService.getSubmission(year_sd,year_ed,usersFlag).subscribe(
      resp => {
        
         this.lastYearTotalSubmissions = resp['data'];
         this.lastYearToper            = this.lastYearTotalSubmissions.sort((a, b) => b.total_submission - a.total_submission).slice(0,4)

      },
      
      error => this.errorMessage = <any>error
    );

    
  }

}
