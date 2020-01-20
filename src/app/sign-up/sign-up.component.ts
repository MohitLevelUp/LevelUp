import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Signup } from 'src/app/_models/signup';
import { UserService } from 'src/app/_services/user.service';
import { NotifierService } from "angular-notifier"; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private readonly notifier: NotifierService;
  
  successMessage: any;
  errorMessage: any;

  constructor(private userService: UserService,
  	private router: Router,
   notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() { 
  }

  signUp(form: NgForm) {
    this.userService.signUp(form.value).subscribe(

      res => {
        if(res['status_code'] == 200){

          this.successMessage = res.message;
           this.notifier.show({
              type: "success",
              message: this.successMessage,
           });
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
      form.resetForm();
  }

}
