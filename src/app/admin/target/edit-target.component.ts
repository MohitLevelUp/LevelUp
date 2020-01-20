import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KpiService } from 'src/app/_services/kpi.service';
import { TargetService } from 'src/app/_services/target.service';
import { UserService } from 'src/app/_services/user.service'; 
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-edit-target',
  templateUrl: './edit-target.component.html',
  styleUrls: ['./edit-target.component.css']
})
export class EditTargetComponent implements OnInit {

  kpiList:any;
  errorMessage: any;
  usersInfo: any;
  teamInfo: any;
  selectedTeams = [];
  selectedUsers = [];
  allTeamListSettings = {};
  allUserListSettings = {};

  targetDetails: any;
  targetId: any;
  kpiId: any;
  teams_target: any;
  users_target: any;
  target_period: any;

  constructor(private targetService: TargetService,private route: ActivatedRoute,
   private kpiService: KpiService, private userService: UserService,
    private router: Router) { }
  
  getTargetDetails(targetId){
    this.targetService.getTargetDetails(targetId).subscribe(
      res => {
        console.log(res);
        if(res.status_code == '200'){
         this.targetDetails = res['data'];
         this.kpiId            = this.targetDetails['kpi_id'];
         this.targetId         = this.targetDetails['id'];
         this.teams_target     = this.targetDetails['teams_target']; 
         this.users_target     = this.targetDetails['users_target'];
         this.target_period    = this.targetDetails['target_period'];
       }
          
      },
      
      error => this.errorMessage = <any>error
    );
  }
  

  ngOnInit() {
    let targetId = +this.route.snapshot.paramMap.get('id');

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

    this.getTargetDetails(targetId);

  }

   

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
