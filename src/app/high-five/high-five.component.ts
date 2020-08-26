import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { NgForm } from '@angular/forms';
import { NotifierService } from "angular-notifier";
declare var $: any; 

@Component({
  selector: 'app-high-five',
  templateUrl: './high-five.component.html',
  styleUrls: ['./high-five.component.css']
})
export class HighFiveComponent implements OnInit {
  userProfile    = JSON.parse(localStorage.getItem('user'));
  private readonly notifier: NotifierService;

  selectedsendTo = '';
  
  userName:any;
  usersInfo:any;
  highFiveTotal:any;

  successMessage: any;
  errorMessage: any;
  polling:any;

  textMessage:any;  
  msgHideAndShow:boolean=false; 

  constructor(private route: ActivatedRoute,private userService: UserService, 
    private coreValueService: CoreValueService,notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  ngOnInit() {

  	$( "#main-content" ).css({"display": "none"});
  	this.route.queryParams.subscribe(params => {
      this.userName = params['name'];

    })

// getting all user's list
    this.userService.userList().subscribe(
      resp => {
        this.usersInfo = resp['data']; 
      },
      
      error => this.errorMessage = <any>error
    );

    this.getHighFiveTotal();
    this.polling = setInterval(() => {
    this.getHighFiveTotal(); 
  }, 4000);

  }

   // getting total sent high five
   getHighFiveTotal(){
     this.coreValueService.highFiveTotal().subscribe(
      resp => {
        if(resp['status_code'] == 200){
           this.highFiveTotal = resp['data']['total_high_five']; 
        }else{
           this.highFiveTotal = ''; 
        }
      },
      
      error => this.errorMessage = <any>error
    );
   }
    

  // high five send to
  sendHighFive(form: NgForm) {
     
    var data = {
      sendTo: form.value['sendTo'],
      sendBy: this.userProfile['email_id'],
      
    };

    this.coreValueService.sendHighFive(data).subscribe(
      (resp) => {
        if(resp['status_code'] == 200){
          this.getHighFiveTotal();
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
    this.selectedsendTo = '';
  }

  ngOnDestroy() {
    clearInterval(this.polling);
  }

}
