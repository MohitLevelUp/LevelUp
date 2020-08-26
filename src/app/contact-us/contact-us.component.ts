import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactmodel: any = {};
  private readonly notifier: NotifierService;	
  successMessage: any;
  errorMessage: any;

  constructor(private userService: UserService,notifierService: NotifierService) { }

  ngOnInit() {

  }

   contactUs(form: NgForm) {
    this.userService.contactUs(form.value).subscribe(
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

}
