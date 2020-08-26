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
  iconUrl        = environment.uploadUrl;
  userProfile    = JSON.parse(localStorage.getItem('user'));

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

  }

}
