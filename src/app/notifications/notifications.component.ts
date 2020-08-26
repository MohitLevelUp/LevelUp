import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router, NavigationStart } from '@angular/router';
import { NotifierService } from "angular-notifier";

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  takenCoreValue:any;
  receiveKudos:any;
  errorMessage: any;	
  
  notificationList: Array<{ id: any, notification: any, send_by: any, description: any, status:any, date: any }> = [];
  sortNotification:any;
  constructor(public userService: UserService,private coreValueService: CoreValueService) { }

  ngOnInit() {
  	this.getUserReceiveKudosList();
  	this.getUserReceiveCoreValuesList();
  }

  //get user receive Kudos
  getUserReceiveKudosList(){

    this.coreValueService.getUserReceiveKudos().subscribe(
      resp => {
        if(resp['status_code'] == 200){
           this.receiveKudos = resp['data'];
           for(var i=0; i<this.receiveKudos.length; i++){
           	  this.notificationList.push({ 'id': this.receiveKudos[i].id, 'notification': this.receiveKudos[i].name,
           	   'send_by': this.receiveKudos[i].user_name, 'description': this.receiveKudos[i].why_given, 'status': this.receiveKudos[i].status, 'date': this.receiveKudos[i].given_date });
        
           }
           
           console.log('ku', this.receiveKudos);
          
        }else{
          this.receiveKudos = "";
        }

      },
      
      error => this.errorMessage = <any>error
    );
  }


  //get user receive core value
  getUserReceiveCoreValuesList(){
    this.coreValueService.getUserReceiveCoreValues().subscribe(
      resp => {

        if(resp['status_code'] == 200){
          this.takenCoreValue = resp['data'];

          for(var i=0; i<this.takenCoreValue.length; i++){
           	  this.notificationList.push({ 'id': this.takenCoreValue[i].id, 'notification': this.takenCoreValue[i].name,
           	   'send_by': this.takenCoreValue[i].user_name, 'description': this.takenCoreValue[i].why_given, 'status': this.takenCoreValue[i].status, 'date': this.takenCoreValue[i].date });
        
           }
           this.sortNotification    = this.notificationList.sort((a, b) => b.id - a.id);
          console.log('cor', this.takenCoreValue);
          console.log('noti', this.sortNotification);

        }else{
          this.takenCoreValue = "";
        }
        
      },
      
      error => this.errorMessage = <any>error
    );
  }

  
  //get notification details by id
 getNotificationDetails(event){
     var target = event.target || event.srcElement || event.currentTarget;
     var idInfo = target.attributes.id;
     var notificationId = idInfo.nodeValue;
      console.log(idInfo);
    //  this.selectedItems.length = 0;
    //  this.selectedUserList.length = 0;
    // //get single team details
    // this.userService.getTeamMembers(teamId).subscribe(
    //   resp => {
    //     this.singleteamInfo = resp['data']; 
    //     // console.log(this.singleteamInfo);

    //     if(this.singleteamInfo)
    //     $("#edit_team").modal('show');
      
     
       
    //    for (let i = 0; i < this.singleteamInfo.length; i++) {
         
    //         this.selectedUserList.push({ 'id': this.singleteamInfo[i].user_id, 'display_name': this.singleteamInfo[i].display_name });

    //     }
    //      //for drop down
         
    //      this.editselectedItems = this.selectedUserList;

    //   },
      
    //   error => this.errorMessage = <any>error
    // );

 }


}
