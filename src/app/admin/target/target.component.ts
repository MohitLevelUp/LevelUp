import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KpiService } from 'src/app/_services/kpi.service';
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service';
import { Router, NavigationStart } from '@angular/router';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

  private readonly notifier: NotifierService;

  private usersTarget:string = "";
  private teamsTarget:string = "";
  selectedKpi ='';
  selectedPeriod ='';

  kpiList:any;
  errorMessage: any;
  usersInfo: any;
  teamInfo: any;
  selectedTeams = [];
  selectedUsers = [];
  allTeamListSettings = {};
  allUserListSettings = {};

  constructor(private targetService: TargetService, private kpiService: KpiService,
   private userService: UserService,
    private router: Router,notifierService: NotifierService) {
      this.notifier = notifierService;
  }

  ngOnInit() {

    //for drop down
    this.allTeamListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    //for drop down
    this.allUserListSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'display_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };


  	this.kpiService.createdKpiList().subscribe(
      resp => {
        this.kpiList = resp['data'];
       
      },
      
      error => this.errorMessage = <any>error
    );


    //get all user's details
    this.userService.userList().subscribe(
      resp => {
        this.usersInfo = resp['data']; 
        

      },
      
      error => this.errorMessage = <any>error
    );

     //get all team's details
    this.userService.teamList().subscribe(
      resp => {
        this.teamInfo = resp['data']; 
        
      },
      
      error => this.errorMessage = <any>error
    );
  }


  // save target
  saveTarget(form: NgForm) {

    this.targetService.addTarget(form.value).subscribe(
      res => {
       if(res['status_code'] == 200){
         this.router.navigate(['/goals']);
        }
         
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
