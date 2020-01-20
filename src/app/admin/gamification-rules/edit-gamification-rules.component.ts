import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { Kpi } from 'src/app/_models/kpi';
import { KpiService } from 'src/app/_services/kpi.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-edit-gamification-rules',
  templateUrl: './edit-gamification-rules.component.html',
  styleUrls: ['./edit-gamification-rules.component.css']
})
export class EditGamificationRulesComponent implements OnInit {
  private readonly notifier: NotifierService;

  kpiDetails: Kpi[];
  errorMessage: any;
  kpiId: any;
  kpiname: any;
  selectedFormula: any;
  selectedBehavior: any;
  selectedPoint: any;

  constructor(private router: Router,private route: ActivatedRoute,
  	private kpiService: KpiService,notifierService: NotifierService) {
     this.notifier = notifierService;
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

}
