import { Component, OnInit } from '@angular/core';
import { TargetService } from 'src/app/_services/target.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  topThree      : any;
  monthJoinings : any;
  totalSubmissions : any;
  errorMessage: any;

  constructor(private targetService: TargetService,) { }

  ngOnInit() {
   //get all user's last month submissions
    this.targetService.lastMonthtotalSubmission().subscribe(
      resp => {
      
        this.totalSubmissions = resp['data'];
        console.log('sub',this.totalSubmissions);

      },
      
      error => this.errorMessage = <any>error
    );

    //get all user's last month joining
    this.targetService.lastMonthTotalJoining().subscribe(
      resp => {
      
        this.monthJoinings = resp['data'];
        this.topThree = this.monthJoinings.sort((a, b) => b.total_joining - a.total_joining).slice(0,3)

        console.log(this.topThree);

      },
      
      error => this.errorMessage = <any>error
    );
  }

}
