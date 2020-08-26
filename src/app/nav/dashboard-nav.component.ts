import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { CoreValueService } from 'src/app/_services/core-value.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));

  takenCoreValue:any;
  receiveKudos:any;
  errorMessage: any;	

  count: any;
  countInterval: any;
  totalNotification: any;

  constructor(public userService: UserService,private coreValueService: CoreValueService,) { }

  ngOnInit() {

   this.getUserReceiveKudosList();
   this.countInterval = setInterval(() => {
    this.getUserReceiveKudosList(); 
  }, 4000);

  }

  //get user receive Kudos
  getUserReceiveKudosList(){

    this.coreValueService.getUserReceiveKudos().subscribe(
      resp => {
        this.count = 0;
        if(resp['status_code'] == 200){
           this.receiveKudos = resp['data'];

           
           for(var i=0; i<this.receiveKudos.length; i++){
           	 if(this.receiveKudos[i]['status'] == 0){
                this.count = this.count + 1;
           	 }
           	 
           }
          
        }else{
          this.receiveKudos = "";
        }

         this.getUserReceiveCoreValuesList(this.count);

      },
      
      error => this.errorMessage = <any>error
    );
  }


  //get user receive core value
  getUserReceiveCoreValuesList(count){

    

    this.coreValueService.getUserReceiveCoreValues().subscribe(
      resp => {
        this.totalNotification = count;

        if(resp['status_code'] == 200){
           this.takenCoreValue = resp['data'];

            for(var i=0; i<this.takenCoreValue.length; i++){
              if(this.takenCoreValue[i]['status'] == 0){
                this.totalNotification = this.totalNotification + 1;
              }
            }

        }else{
          this.takenCoreValue = "";
        }
        
      },
      
      error => this.errorMessage = <any>error
    );
  }

  ngOnDestroy() {
    clearInterval(this.countInterval);
  }

}
