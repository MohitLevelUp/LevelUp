import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KpiService } from 'src/app/_services/kpi.service';
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { NotifierService } from "angular-notifier";

declare var $: any;
@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));

  private readonly notifier: NotifierService;

  public form: any = {
   coreValueId: ''
  }

  selectedPeriod='';
  
  kpiList:any;
  userskpiList:any;
  singlekpiInfo:any;

  successMessage: any;
  errorMessage: any;

  usersInfo: any;
  teamInfo: any;
  periodList: any;

  targetList:any;
  allTargetList:any;

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
    private userService: UserService,notifierService: NotifierService) {
     this.notifier = notifierService;
    }
  unsorted() { }//this is for period view in order

  
  //assign a kpi

  assignKpi(form2: NgForm) {

    this.kpiService.assignKpi(form2.value).subscribe(
      (resp) => {

         $("#kpiModal").modal('hide');
         if(resp.status_code == '200'){
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
    form2.resetForm();
  }

  //get kpi details by id
 getKpiDetails(event){
     var target = event.target || event.srcElement || event.currentTarget;
     var idAttr = target.attributes.id;
     var kpiId  = idAttr.nodeValue;
     
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
           this.getkpiList();
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

  usersKpiList(){
    //get user's kpi list
    this.kpiService.getUsersKpiList().subscribe(
      resp => {
        this.userskpiList = resp['data'];
        
        
      },
      
      error => this.errorMessage = <any>error
    );
  }


  getkpiList(){
    //get all kpi list
    this.kpiService.getKpiList().subscribe(
      resp => {
        this.kpiList = resp['data'];
      },
      
      error => this.errorMessage = <any>error
    );
  }


  // Target functions start

  usersTargetList(){
    //get user's target list
    this.targetService.getUsersTargetList().subscribe(
      resp => {
        this.targetList = resp['data']; 
        
      },
      
      error => this.errorMessage = <any>error
    );
  }

 //edit target by id
 // editTarget(event){
 //     var target = event.target || event.srcElement || event.currentTarget;
 //     var idAttr = target.attributes.id;
 //     var kpiId  = idAttr.nodeValue;

 //    this.kpiService.inActiveKpi(kpiId).subscribe(
 //      resp => {
 //         if(resp['status_code'] == 200){
 //           // getting all kpi's list
 //           this.getkpiList();
 //        }

 //      },
 //      error => this.errorMessage = <any>error
 //    );
 // }



  ngOnInit() {

    // getting all kpi's list
    this.getkpiList();
    
    //getting user's kpi list
    this.usersKpiList();

    //getting user's target list
    this.usersTargetList();


    //get all target list
    this.targetService.getTargetList().subscribe(
      resp => {
        this.allTargetList = resp['data'];
        
      },
      
      error => this.errorMessage = <any>error
    );


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

   
  	//get all user's details
    this.userService.userList().subscribe(
      resp => {
        this.usersInfo = resp['data']; 
       // console.log('user',this.usersInfo);

      },
      
      error => this.errorMessage = <any>error
    );

  	 //get all team's details
    this.userService.teamList().subscribe(
      resp => {
        this.teamInfo = resp['data']; 
        //console.log(this.teamInfo);
      },
      
      error => this.errorMessage = <any>error
    );


    

    //get all period list
  	this.kpiService.getPeriodList().subscribe(
      resp => {
        this.periodList = resp['data'];
        //console.log('pr', this.periodList);
      },
      
      error => this.errorMessage = <any>error
    );

  }


 onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}