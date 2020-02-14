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

  constructor(private targetService: TargetService) { }

  ngOnInit() {
  	var date             = new Date();
    this.currentDate     = moment(date).format('YYYY-MM-DD');
    this.yearStartDate   = moment().startOf('year').format('YYYY-MM-DD');
    this.getJoining();

  }

  // get joinings
  getJoining(){
  	// call teams job posting 
    this.targetService.getJoining(this.yearStartDate,this.currentDate,this.usersFlag).subscribe(
      resp => {
           if(resp['status_code'] == 200){
           	 this.usersJoining = resp['data'];
           	 console.log('st',this.usersJoining);
           	}else{
           	 this.usersJoining = '';
           	}
          
      },
      
      error => this.errorMessage = <any>error
    );
  }

}
