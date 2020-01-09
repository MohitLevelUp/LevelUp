import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KpiService } from 'src/app/_services/kpi.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {
  errorMessage: any;
  weightage = [10,20,30,40,50,60,70,80,90,100];

  constructor(private kpiService: KpiService, private router: Router) { }

  ngOnInit() {
  }

  addKpi(form: NgForm) {
    this.kpiService.addKpi(form.value).subscribe(
      res => {
       if(res['status_code'] == 200){
         this.router.navigate(['/goals']);
        }
         
      },
      error => this.errorMessage = <any>error
    );
  }

}
