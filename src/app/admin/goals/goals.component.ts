import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KpiService } from 'src/app/_services/kpi.service';
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { NotifierService } from "angular-notifier";
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValue } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit { 

  user   = JSON.parse(localStorage.getItem('user')); 
  teamId = this.user['team_id'] ;


  private readonly notifier: NotifierService;

  public form: any = {
   coreValueId: ''
  }

  selectedPeriod='';
  selectedUser = '';
  
  kpiList:any;
  userskpiList:any;
  singlekpiInfo:any;
  teamskpiList:any;
  teamsTargetList:any;

  successMessage: any;
  errorMessage: any;

  usersInfo: any;
  teamInfo: any;
  periodList: any;

  targetList:any;
  allTargetList:any;

  filterUser:any;

  //for drop down
  dropdownList  = [];
  selectedTeams = [];
  selectedUsers = [];
  selectedKpis  = [];
  allTeamListSettings = {};
  allUserListSettings = {};
  allKpiListSettings = {};

  selectedKpiList: Array<{ id: number, name: any }> = [];

  constructor(private targetService: TargetService, private kpiService: KpiService, 
    private userService: UserService,notifierService: NotifierService,
    private router: Router,private route: ActivatedRoute) {
     this.notifier = notifierService;
    }
    
  // unsorted() { }//this is for period view in order
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
  return 0;
}
  
  //assign a kpi

  assignKpi(form2: NgForm) { 
    $("#onSubmitLoading").css({"display": "block"});
    this.kpiService.assignKpi(form2.value).subscribe(
      (resp) => {

         $("#kpiModal").modal('hide');
         if(resp.status_code == '200'){
             $("#onSubmitLoading").css({"display": "none"});
             this.successMessage = resp.message;
             this.notifier.show({
                type: "success",
                message: this.successMessage,
             });
          }else{
             $("#onSubmitLoading").css({"display": "none"});
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
    this.selectedKpis  = [];
    this.selectedUsers = [];
    this.selectedTeams = [];
    form2.resetForm();
  }

// reset assign kpi form
  resetAssignKpi(){
    this.selectedUsers = [];
    this.selectedTeams = [];
    this.selectedKpis  = [];
  }

  //kpi filter

  kpiFilter(formfilter: NgForm) {
    var user_id = formfilter.value.userId;

    // call user info function
    this.getUserDetails(user_id);
   
   // call assigned kpi function
    this.assignedKpiList(user_id);

    // call users target list function

    this.usersTargetList(user_id);

    // hide popup model
    $("#filter_model").modal('hide');


    
  }

// get user profile
  getUserDetails(user_id:any){
    this.userService.getUser(user_id).subscribe(
      res => {
        this.filterUser = res['data'].display_name;
      },
      
      error => this.errorMessage = <any>error
    );
  }

  //get kpi details by id
 getKpiDetails(event){
     var target = event.target || event.srcElement || event.currentTarget;
     var idAttr = target.attributes.id;
     var kpiId  = idAttr.nodeValue;

     this.selectedKpiList = [];
    //get single kpi details
    this.kpiService.getKpiDetails(kpiId).subscribe(
      resp => {
        this.singlekpiInfo = resp['data'];
        
        this.selectedKpiList.push({ 'id': this.singlekpiInfo.id, 'name': this.singlekpiInfo.name });
        
        this.selectedKpis = this.selectedKpiList;
      },
      error => this.errorMessage = <any>error
    );
 }



 //inactive kpi by id
 inActiveKpi(event){
     var target = event.target || event.srcElement || event.currentTarget;
     var idAttr = target.attributes.id;
     var kpiId  = idAttr.nodeValue;

    //inactive kpi
    this.kpiService.inActiveKpi(kpiId).subscribe(
      resp => {
         if(resp['status_code'] == 200){
         this.successMessage = resp.message;
          this.notifier.show({
            type: "success",
            message: this.successMessage,
          });
           // getting all kpi's list
           var user_id ='';
           this.assignedKpiList(user_id);
        }else{
             this.errorMessage = resp.message;
             this.notifier.show({
                type: "error",
                message: this.errorMessage,
             });
          }

      },
      error => this.errorMessage = <any>error
    );
 }

  //user kpi list
  assignedKpiList(user_id:any){
    //get assigned kpi list

    this.kpiService.getAssignedKpiList(user_id).subscribe(
      resp => {
        if(resp.status_code == 200){
          this.userskpiList = resp['data'];
          console.log('kpi',this.userskpiList);
          
        }else{
          this.userskpiList = '';
        }

        
 
      },
      
      error => this.errorMessage = <any>error
    );
  }



  createdkpiList(){
    //get admin/manager created kpi list
    this.kpiService.createdKpiList().subscribe(
      resp => {
        this.kpiList = resp['data'];

      },
      
      error => this.errorMessage = <any>error
    );
  }


  // Target functions start

  usersTargetList(user_id:any){
    //get user's target list
    $("#onSubmitLoading").css({"display": "block"});

    this.targetService.getUsersTargetList(user_id).subscribe(
      resp => {
        if(resp['status_code'] == 200){

          $("#onSubmitLoading").css({"display": "none"});  

          this.targetList = resp['data'];

        }else{
           $("#onSubmitLoading").css({"display": "none"}); 

           this.targetList = '';

          }
        
      },
      
      error => this.errorMessage = <any>error
    );
  }


 //inactive target by id

   inActiveTarget(event){
     var target = event.target || event.srcElement || event.currentTarget;
     var idAttr = target.attributes.id;
     var targetId  = idAttr.nodeValue;


    this.targetService.inActiveTarget(targetId).subscribe(
      resp => {
         if(resp['status_code'] == 200){
         this.successMessage = resp.message;
          this.notifier.show({
            type: "success",
            message: this.successMessage,
          });
           // getting all target's list
           var user_id ='';
            this.usersTargetList(user_id);

        }else{
             this.errorMessage = resp.message;
             this.notifier.show({
                type: "error",
                message: this.errorMessage,
             });
          }

      },
      error => this.errorMessage = <any>error
    );
 }



  ngOnInit() {

    var user_id = '';
    // getting all kpi's list
    this.createdkpiList();
    
    //getting user's kpi list
    this.assignedKpiList(user_id);

    //getting user's target list
    this.usersTargetList(user_id);


    //get all target list
    this.targetService.getManagerCreatedTarget().subscribe(
      resp => {

        if(resp['status_code'] == 200){
          this.allTargetList = resp['data'];
        }else{
          this.allTargetList = '';
        }
        
        
      },
      
      error => this.errorMessage = <any>error
    );
     
    // get team's kpi
    var team_id = this.user['team_id'];
    if(team_id != ''){
      this.kpiService.getTeamKpiList(team_id).subscribe(
      resp => {
        this.teamskpiList = resp['data'];
      },
      
      error => this.errorMessage = <any>error
    );
    }

    // get team's target list
    
    if(team_id != ''){
      this.targetService.getTeamTargetList(team_id).subscribe(
      resp => {
        this.teamsTargetList = resp['data'];
      },
      
      error => this.errorMessage = <any>error
    );
    }

    //for drop down
    this.allKpiListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    //for drop down
    this.allTeamListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    //for drop down
    this.allUserListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'display_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

   
    //get all user's details of team

    this.userService.teamsUserList(this.teamId).subscribe(
      resp => {
        this.usersInfo = resp['data']; 

      },
      
      error => this.errorMessage = <any>error
    );

     //get all team's details
    this.userService.getTeamDetails(this.teamId).subscribe(
      resp => {
         this.teamInfo = resp['data']; 
      },
      
      error => this.errorMessage = <any>error
    );


    

    //get all period list
    this.kpiService.getPeriodList().subscribe(
      resp => {
        this.periodList = resp['data'];
      },
      
      error => this.errorMessage = <any>error
    );

  }


 onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

}
