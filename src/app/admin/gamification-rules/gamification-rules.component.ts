import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KpiService } from 'src/app/_services/kpi.service'; 
import { Router, NavigationStart } from '@angular/router';
import { NotifierService } from "angular-notifier";

declare var $: any;
@Component({
  selector: 'app-gamification-rules',
  templateUrl: './gamification-rules.component.html',
  styleUrls: ['./gamification-rules.component.css']
})
export class GamificationRulesComponent implements OnInit {
  gRulemodel: any = {};

  userProfile      = JSON.parse(localStorage.getItem('user'));

  private readonly notifier: NotifierService;

  selectedBehavior = '';
  selectedPoint    = '';

  behaviorsList :any;
  pointList:any;
  errorMessage: any;
  successMessage:any;
  weightage = [10,20,30,40,50,60,70,80,90,100];

  constructor(private kpiService: KpiService, private router: Router,
    notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

// get behavior
  getBehavior(){
     this.kpiService.getBehaviorsList().subscribe(
      res => {
        if(res['status_code'] == 200){
           this.behaviorsList = res['data'];
        }else{
          this.behaviorsList = "";
        }

      },
      
      error => this.errorMessage = <any>error
    );
  }

 // get point list
  getPointList(){
     this.kpiService.getPointList().subscribe(
      res => {
        console.log('po',res);
        if(res['status_code'] == 200){
           this.pointList = res['data'];
        }else{
          this.pointList = "";
        }

      },
      
      error => this.errorMessage = <any>error
    );
  }


  ngOnInit() {

   this.getBehavior();

   this.getPointList();
 
  }

  // add new kpi
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

  // add new behavior

  addBehavior(form_b: NgForm) {
    console.log(form_b.value);
    this.kpiService.addBehavior(form_b.value).subscribe(
      res => {
       if(res['status_code'] == 200){

         this.getBehavior();

         this.selectedBehavior = res['data'];

         $("#behaviorModal").modal('hide');

          this.successMessage = res.message;
           this.notifier.show({
              type: "success",
              message: this.successMessage,
           });
        }else{
           this.errorMessage = res.message;
           this.notifier.show({
              type: "error",
              message: this.errorMessage,
           });
        }
         
      },
      error => this.errorMessage = <any>error
    );
    form_b.resetForm();
  }


  // add new point
  addNewPoint(form_P: NgForm) {
    var customPoint = form_P.value['custom_point'];
    this.kpiService.addNewPoint(form_P.value).subscribe(
      res => {
       if(res['status_code'] == 200){

         this.getPointList();

         this.selectedPoint = customPoint;

         $("#pointModal").modal('hide');

          this.successMessage = res.message;
           this.notifier.show({
              type: "success",
              message: this.successMessage,
           });
        }else{
           this.errorMessage = res.message;
           this.notifier.show({
              type: "error",
              message: this.errorMessage,
           });
        }
         
      },
      error => this.errorMessage = <any>error
    );
    form_P.resetForm();
  }

}
