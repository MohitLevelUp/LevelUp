import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { NgForm } from '@angular/forms';
import { Kpi } from 'src/app/_models/kpi';
import { KpiService } from 'src/app/_services/kpi.service';
import { NotifierService } from "angular-notifier";

declare var $: any;
@Component({
  selector: 'app-edit-gamification-rules',
  templateUrl: './edit-gamification-rules.component.html',
  styleUrls: ['./edit-gamification-rules.component.css']
})
export class EditGamificationRulesComponent implements OnInit {
  gRulemodel: any = {};
  
  private readonly notifier: NotifierService;

  kpiDetails: Kpi[];
  errorMessage: any;
  successMessage:any;

  kpiId: any;
  kpiname: any;
  selectedFormula: any;
  selectedBehavior: any;
  selectedPoint: any;

  behaviorsList :any;
  pointList:any;

  constructor(private router: Router,private route: ActivatedRoute,
  	private kpiService: KpiService,notifierService: NotifierService) {
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
  	  let kpiId = +this.route.snapshot.paramMap.get('id');

  	  this.kpiService.getKpiDetails(kpiId).subscribe(
      res => {
       if(res.status_code == '200'){
       	this.kpiDetails = res['data'];
       	this.kpiId            = this.kpiDetails['id'];
       	this.kpiname          = this.kpiDetails['name'];
       	this.selectedFormula  = +this.kpiDetails['formula']; //+ sign convert string to number
       	this.selectedBehavior = this.kpiDetails['behavior_id'];
       	this.selectedPoint    = this.kpiDetails['point'];
       }
  
      },
      
      error => this.errorMessage = <any>error
    );


      this.getBehavior();

      this.getPointList();
  }

  updateKpi(form: NgForm) {

    this.kpiService.updateKpi(form.value).subscribe(
      (resp) => {

         if(resp.status_code == '200'){
           this.router.navigate(['/goals']);
          }else{
             this.errorMessage = resp.message;
             this.notifier.show({
                type: "error",
                message: this.errorMessage,
             });
          }

      },
      error => {
         this.errorMessage = <any>error
      }

    );
    form.resetForm();
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
