import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  iconUrl        = environment.uploadUrl;
  userDetails    = JSON.parse(localStorage.getItem('user'));
  userID         = this.userDetails['user_id'];
  selectedSpeciality = '';

  private readonly notifier: NotifierService;
  getUserId    = +this.route.snapshot.paramMap.get('id');

  user: any;
  successMessage: any;
  errorMessage: any;
  userInfo: any;
  private base64textString:String="";

  constructor(private http: Http, private userService: UserService, 
    private router: Router,private route: ActivatedRoute,notifierService: NotifierService) {
    this.notifier = notifierService;

   }

    //get file and conver it in base64 encode
  handleFileSelect(evt){
      var files  = evt.target.files;
      var file   = files[0];
      var target = evt.target || evt.srcElement || evt.currentTarget;
      var idAttr = target.attributes.id;
      var userId  = idAttr.nodeValue;
      localStorage.setItem('profileId', JSON.stringify(userId));  
    
      if (files && file) {
          var reader    = new FileReader();

          reader.onload = this._handleReaderLoaded.bind(this);

          reader.readAsBinaryString(file);

          
      }
  }
  
  _handleReaderLoaded(readerEvt) {
     var user_id = JSON.parse(localStorage.getItem('profileId'));

     var binaryString = readerEvt.target.result;
     this.base64textString= btoa(binaryString);

      this.userService.updateUserImage(this.base64textString, user_id).subscribe(
        (res) => {
           localStorage.removeItem('profileId');
           if(res['status_code'] == 200){
              this.successMessage = res.message;
               this.notifier.show({
                  type: "success",
                  message: this.successMessage,
               });
             let userId = +this.route.snapshot.paramMap.get('id');
             //get user details
             this.userProfile(userId);
            }else{
               this.errorMessage = res.message;
               this.notifier.show({
                  type: "error",
                  message: this.errorMessage,
               });
            }

           
        },
        error => this.errorMessage = <any>error
      );
    

    }

  userProfile(userId:any){
    
    this.userService.getUser(userId).subscribe(
      resp => {
        this.user     = resp;
        this.userInfo = this.user['data']; 
       
        this.selectedSpeciality = this.userInfo['speciality'];

        if(Number(userId) == Number(this.userID)){
           localStorage.setItem('user', JSON.stringify(this.userInfo)); //set updated data into session
        }
        
      },
      
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit() {
    
     //get user details
     this.userProfile(this.getUserId);
    
  }

  updateUser(form: NgForm) {
    $("#onSubmitLoading").css({"display": "block"});
    this.userService.updateUser(form.value).subscribe(
      res => {
        
        if(res['status_code'] == 200){
            $("#onSubmitLoading").css({"display": "none"});
            this.userProfile(this.getUserId);
            this.successMessage = res['message'];
               this.notifier.show({
                  type: "success",
                  message: this.successMessage,
               });
        }else{
              $("#onSubmitLoading").css({"display": "none"});
               this.errorMessage = res['message'];
               this.notifier.show({
                  type: "error",
                  message: this.errorMessage,
               });
            }
         
      },
      error => this.errorMessage = <any>error
    );
  }

}
