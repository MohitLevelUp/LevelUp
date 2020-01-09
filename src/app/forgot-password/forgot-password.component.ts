import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private readonly notifier: NotifierService;

  successMessage: any;

  errorMessage: any;

  constructor(private userService: UserService,notifierService: NotifierService) {
    this.notifier = notifierService;
   }


  ngOnInit() {
  }

  forgotPassword(form: NgForm) {

    this.userService.forgotPassword(form.value).subscribe(
      (resp) => {
        if(resp.status_code == '200'){
           this.successMessage = resp.message;
           this.notifier.show({
              type: "success",
              message: this.successMessage,
           });
        }else{
           this.errorMessage = resp.message;
           // this.notifier.notify("success", this.errorMessage);
           this.notifier.show({
              type: "error",
              message: this.errorMessage,
              // id: "THAT_NOTIFICATION_ID" // Again, this is optional
           });
        }
        
      },
      error => {
         this.errorMessage = <any>error
      }

    );
    form.resetForm();
  }

}
