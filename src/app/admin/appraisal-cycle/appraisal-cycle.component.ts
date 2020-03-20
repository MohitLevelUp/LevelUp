import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AppraisalService } from 'src/app/_services/appraisal.service';
import { UserService } from 'src/app/_services/user.service';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-appraisal-cycle',
  templateUrl: './appraisal-cycle.component.html',
  styleUrls: ['./appraisal-cycle.component.css']
})
export class AppraisalCycleComponent implements OnInit {

  appraisalmodel: any = {};

  selectedreportingTo = '';
  selectedPeriod = '';
  selectedEmployee = '';

  private readonly notifier: NotifierService;
  
  usersInfo:any;
  successMessage: any;
  errorMessage: any;

  constructor(private appraisalService: AppraisalService,
  	private userService: UserService, 
  	notifierService: NotifierService) {
   this.notifier = notifierService;
   }

  ngOnInit() {
  	this.getUserList();
  }

   //start user function
  getUserList(){
    //get all user's details
    this.userService.userList().subscribe(
      resp => {
        this.usersInfo = resp['data']; 
      },
      error => this.errorMessage = <any>error
    );
  }

    addAppraisal(form: NgForm) {
    	console.log(form.value);

    this.appraisalService.addAppraisal(form.value).subscribe(
      (resp) => {
        if(resp['status_code'] == 200){

          this.successMessage = resp.message;
           this.notifier.show({
              type: "success",
              message: this.successMessage,
           });
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
    this.selectedreportingTo = '';
    this.selectedPeriod = '';
    this.selectedEmployee = '';
  }

}
