import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInmodel: any = {};

  private readonly notifier: NotifierService;

  rememberMe: any;
  cookieValue: any;
  userData: any;
  errorMessage: any;
  invalidLogin: boolean;
  constructor(private http: Http, private cookieservice: CookieService,
   private userService: UserService,private router: Router, notifierService: NotifierService) {
     this.notifier = notifierService;
   }

  ngOnInit() {
    // this.cookieValue = this.cookieservice.get('ai_session');
    // if (this.cookieValue != '') {
    //   this.rememberMe = JSON.parse(window.atob(this.cookieValue));
    //   // console.log('coo',this.rememberMe);
    // } else {
    //   this.rememberMe = { UserName: "", Password: "", remember: false };
    // }
  }


  signIn(form: NgForm) {
    this.userService.signIn(form.value).subscribe(
      resp => {
        this.userData = resp;
       
        if(this.userData.status_code == '200'){
          localStorage.setItem('authToken', JSON.stringify(this.userData.token));
          localStorage.setItem('user', JSON.stringify(this.userData.data));

          this.router.navigate(['/goals']);

        }else{

           this.errorMessage = resp.message;
           this.notifier.show({
              type: "error",
              message: this.errorMessage,
           });

        	this.invalidLogin = true;
          
        }


      },

      error => this.errorMessage = <any>error
    );
     if (form.value['remember'] == false) {
      form.resetForm();
    }
  }

}
