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

  submissionSum: any[] = [];

  constructor(private targetService: TargetService,) { }

  ngOnInit() {
    
   //get all user's current month submissions total according to team
    var nowdate       = new Date();
    var monthStartDay = new Date(nowdate.getFullYear(), nowdate.getMonth(), 1);
    var monthEndDay   = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);

    var month_sd = moment(monthStartDay).format('YYYY-MM-DD');
    var month_ed = moment(monthEndDay).format('YYYY-MM-DD');


    this.targetService.currentMonthtotalSubmission(month_sd,month_ed).subscribe(
      resp => {
        
         this.totalSubmissions = resp['data'];

      },
      
      error => this.errorMessage = <any>error
    );

    // get 2019 submissions

    var year_sd = '2019-01-01';
    var year_ed = '2019-12-31';

    this.targetService.totalSubmission(year_sd,year_ed).subscribe(
      resp => {
        
         this.lastYearTotalSubmissions = resp['data'];
         this.lastYearToper = this.lastYearTotalSubmissions.sort((a, b) => b.total_submission - a.total_submission).slice(0,4)

      },
      
      error => this.errorMessage = <any>error
    );

    //get all user's last month joining
    this.targetService.lastMonthTotalJoining().subscribe(
      resp => {
      
        this.monthJoinings = resp['data'];
        this.topThree = this.monthJoinings.sort((a, b) => b.total_joining - a.total_joining).slice(0,3)


      },
      
      error => this.errorMessage = <any>error
    );
  }

}
