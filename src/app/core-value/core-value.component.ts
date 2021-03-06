import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { UserService } from 'src/app/_services/user.service';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotifierService } from "angular-notifier";

import { CorevaluefilterPipe } from 'src/app/_pipe/corevaluefilter.pipe';

declare var $: any;
@Component({
  selector: 'app-core-value',
  templateUrl: './core-value.component.html', 
  styleUrls: ['./core-value.component.css'],
  providers: [ CorevaluefilterPipe ],

})

export class CoreValueComponent implements OnInit {
  iconUrl        = environment.uploadUrl;
  userProfile    = JSON.parse(localStorage.getItem('user'));

  coreValmodel: any = {};
  kudosModel: any = {};

  private readonly notifier: NotifierService;
  selectedcoreValueId = '';
  selectedgivenTo = '';
  selectedgivenToKudos = '';

  earnedcvPoint:number;
  
	coreValuesList: any;
  givenCoreValue:any;
  takenCoreValue:any;
  givenKudos:any;
  receiveKudos:any;
  usersInfo: any;
  stickerList: any;
  successMessage: any;
  errorMessage: any;

  remainingCoreValueList: any;
  remainingCoreValueUserList: any;
  selected_Id:any;
  constructor(private http: Http, private corevaluefilterPipe: CorevaluefilterPipe, private coreValueService: CoreValueService,
    private userService: UserService,notifierService: NotifierService) { 
    this.notifier = notifierService;

  }

  
  
  giveCoreValue(form: NgForm) {

    this.coreValueService.giveCoreValue(form.value).subscribe(
      (resp) => {

        if(resp['status_code'] == 200){
          this.getCoreValueList();
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
    this.selectedgivenTo = '';
  }

  giveKudos(kudosform: NgForm) {
    
    this.coreValueService.giveKudos(kudosform.value).subscribe(
      (resp) => {
      
        if(resp['status_code'] == 200){
          this.getUserGivenKudosList();
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
    kudosform.resetForm();
    this.selectedgivenToKudos = '';
  }

  // getting all core Value's list
  getCoreValueList(){
    this.coreValueService.corevalueList().subscribe(
      resp => {
        this.coreValuesList = resp['data'];  


         this.coreValueService.getUserGivenCoreValues().subscribe(
          resp => {
           
            if(resp['status_code'] == 200){
               this.givenCoreValue = resp['data'];

           this.remainingCoreValueList = this.coreValuesList.filter(o => !this.givenCoreValue.find(o2 => o.id === o2.core_value_id))     

            }else{
              this.givenCoreValue = "";
              this.remainingCoreValueList = this.coreValuesList;
            }
          },
          
          error => this.errorMessage = <any>error
        );
      },
      
      error => this.errorMessage = <any>error
    );
  }

   //get user's given core value
  getUserGivenCoreValuesList(){

    this.coreValueService.getUserGivenCoreValues().subscribe(
      resp => {
       
        if(resp['status_code'] == 200){
           this.givenCoreValue = resp['data'];

        }else{
          this.givenCoreValue = "";
        }
      },
      
      error => this.errorMessage = <any>error
    );
  }

  //start user function
  getUserList(){
    //get all user's details
    this.userService.userList().subscribe(
      resp => {
        this.usersInfo = resp['data']; 

        //call given core value list
        this.coreValueService.getUserGivenCoreValues().subscribe(
          resp => {
           
            if(resp['status_code'] == 200){
              this.givenCoreValue = resp['data'];

              this.remainingCoreValueUserList = this.usersInfo.filter(o => !this.givenCoreValue.find(o2 => o.id === o2.given_to))     

            }else{
              this.givenCoreValue = "";
              this.remainingCoreValueUserList = this.usersInfo;

            }


          },
          
          error => this.errorMessage = <any>error
        );
       
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
        }else{
          this.takenCoreValue = "";
        }
        this.earnedcvPoint = this.takenCoreValue.length * 2;
      },
      
      error => this.errorMessage = <any>error
    );
  }

   //get user's given kudos
  getUserGivenKudosList(){

    this.coreValueService.getUserGivenKudos().subscribe(
      resp => {
        if(resp['status_code'] == 200){
           this.givenKudos = resp['data'];
        }else{
          this.givenKudos = "";
        }
        // this.givingcvPoint = this.givenCoreValue.length * 2;
      },
      
      error => this.errorMessage = <any>error
    );
  }

  //get user receive Kudos
  getUserReceiveKudosList(){

    this.coreValueService.getUserReceiveKudos().subscribe(
      resp => {
       
        if(resp['status_code'] == 200){
           this.receiveKudos = resp['data'];
        }else{
          this.receiveKudos = "";
        }
        // this.earnedcvPoint = this.takenCoreValue.length * 2;
      },
      
      error => this.errorMessage = <any>error
    );
  }
  ngOnInit() {

     // call function getting all core Value's list
    this.getCoreValueList();

    //call function getting all user's list 
    this.getUserList();

    //call function getting given core values 
    this.getUserGivenCoreValuesList();

    //call function getting given core values 
    this.getUserReceiveCoreValuesList();

    //call function getting given core values 
    this.getUserGivenKudosList();

    //call function getting given core values 
    this.getUserReceiveKudosList();

    this.coreValueService.getKudosStickerList().subscribe(
      resp => {
       
        if(resp['status_code'] == 200){
           this.stickerList = resp['data'];
        }
      },
      
      error => this.errorMessage = <any>error
    );


  
  }

onKeydown(event) {
  if (event.key === "@") {
    $("#newstxt").attr("list", "userlist");
  }else if(event.keyCode === 32){
    $("#newstxt").removeAttr( "list" )
  }

  $('input[name=breaking_news]').on('input',function() {
    var selectedOption  = $('option[value="'+$(this).val()+'"]');
    var selectedUserId  = selectedOption.length ? selectedOption.attr('id') : '';
    if(selectedUserId != ''){
      $("#newstxt").attr("rel", selectedUserId);
    //   $("#newsform_userId").val(function() {
    //     return  selectedUserId;
    // });
    }
  });

     var target = event.target || event.srcElement || event.currentTarget;
     var idAttr = target.attributes.rel;
     this.selected_Id  = idAttr.nodeValue; 
  
}

 addNews(newsform: NgForm) {
    this.coreValueService.addNews(newsform.value).subscribe(
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
    newsform.resetForm();
  }



}
