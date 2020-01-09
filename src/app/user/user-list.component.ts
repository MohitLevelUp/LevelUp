import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router, NavigationStart } from '@angular/router';
import { NotifierService } from "angular-notifier";

declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  iconUrl        = environment.uploadUrl;
  private readonly notifier: NotifierService;
  selectedcompanyId = '';
  selectedRoleType  = '';

  showModal: boolean;
  companyInfo:any;
  usersInfo: any;
  teamInfo: any;
  singleteamInfo: any;
  successMessage: any;
  errorMessage: any;
  form1:any;
  private base64textString:String="";

// use in data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  //for drop down
  dropdownList = [];
  selectedItems = [];
  editselectedItems = [];
  dropdownSettings = {};
  allUserListSettings = {};

  selectedUserList: Array<{ id: number, display_name: any }> = [];

  constructor(private userService: UserService, private router: Router,
    notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  //get file and conver it in base64 encode
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader    = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
     this.base64textString= btoa(binaryString);
    }

  //add new Team
  addTeam(form: NgForm) {

    this.userService.addTeam(form.value).subscribe(
      (resp) => {


      	if(resp['status_code'] == 200){

      		$("#for_team").modal('hide');

      		this.getTeamList();

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
  }

  //update Team
  updateTeam(form1: NgForm) {
    this.userService.updateTeam(form1.value).subscribe(
      (resp) => {
        if(resp['status_code'] == 200){
      		$("#edit_team").modal('hide');
      		this.getTeamList();

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
    form1.resetForm();
  }
  

  //create
  createUser(form2: NgForm) {
    console.log(form2.value);
    this.userService.createUser(form2.value).subscribe(
      (resp) => {
        if(resp['status_code'] == 200){
          $("#myModal2").modal('hide');

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
  


//get team details by id
 getTeamDetails(event){
 	 var target = event.target || event.srcElement || event.currentTarget;
     var idAttr = target.attributes.id;
     var teamId = idAttr.nodeValue;
     
     this.selectedItems.length = 0;
     this.selectedUserList.length = 0;
    //get single team details
    this.userService.getTeamDetails(teamId).subscribe(
      resp => {
        this.singleteamInfo = resp['data']; 

        if(this.singleteamInfo)
        $("#edit_team").modal('show');
      
     
       
       for (let i = 0; i < this.singleteamInfo.length; i++) {
         
            this.selectedUserList.push({ 'id': this.singleteamInfo[i].user_id, 'display_name': this.singleteamInfo[i].display_name });

        }
         //for drop down
         
         this.editselectedItems = this.selectedUserList;

      },
      
      error => this.errorMessage = <any>error
    );

 }

 //Delete Team
  deleteTeam(event) {

  	var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var teamId = idAttr.nodeValue;

    this.userService.deleteTeam(teamId).subscribe(
      (resp) => {
       if(resp['status_code'] == 200){

      		this.getTeamList();

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

  }

  //
  // resetForm(){
  // 	console.log('hii');
  // 	 this.form1.reset();
  // }


  //start user function
  getUserList(){
  	//get all user's details
    this.userService.userList().subscribe(
      resp => {
        this.usersInfo = resp['data']; 
        console.log(this.usersInfo);
        this.dtTrigger.next(); 
      },
      
      error => this.errorMessage = <any>error
    );
  }

  //getting team list
  getTeamList(){
  	 //get all team's details
    this.userService.teamList().subscribe(
      resp => {
        this.teamInfo = resp['data']; 
      },
      
      error => this.errorMessage = <any>error
    );
  }


  ngOnInit() {
  	//use in data table
  	this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 100,
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

    // getting all user's list
    this.getUserList();

    // getting all team list
    this.getTeamList();

    //get all company list
    this.userService.companyList().subscribe(
      resp => {
        this.companyInfo = resp['data'];
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

   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
