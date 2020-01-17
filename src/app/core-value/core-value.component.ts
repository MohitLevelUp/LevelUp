import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { UserService } from 'src/app/_services/user.service';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotifierService } from "angular-notifier";

import { CorevaluefilterPipe } from 'src/app/_pipe/corevaluefilter.pipe';


@Component({
  selector: 'app-core-value',
  templateUrl: './core-value.component.html', 
  styleUrls: ['./core-value.component.css'],
  providers: [ CorevaluefilterPipe ]
})
export class CoreValueComponent implements OnInit {
  iconUrl        = environment.uploadUrl;
  userProfile    = JSON.parse(localStorage.getItem('user'));

  private readonly notifier: NotifierService;
  selectedcoreValueId = '';
  selectedgivenTo = '';

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

  filterargs = {id: 10};
  items = [{title: 'hello world'}, {title: 'kitty'}, {title: 'foo bar'}];

   remainingCoreValueList: any;
   remainingCoreValueUserList: any;

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
  }

  giveKudos(form: NgForm) {

    this.coreValueService.giveKudos(form.value).subscribe(
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
//                var skins = [
//     {Id: 0, Name: "oily skin"}, 
//     {Id: 1, Name: "dry skin"}
//     ];

//     var skinName = skins.find(x=>x.Id == 0).Name;
//     // console.log('skin',skinName);
//             var check= ["044", "451"],
// data = ["343", "333", "044", "123", "444", "555"];

// let notPresentInData = this.coreValuesList.filter(core_value_id => !this.givenCoreValue.includes(id)); 

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
           console.log('given',this.givenCoreValue);
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

}
