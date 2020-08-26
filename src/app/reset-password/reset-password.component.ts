import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassmodel: any = {};

  userDetails    = JSON.parse(localStorage.getItem('user'));
  userData: any;
  errorMessage: any;

  private readonly notifier: NotifierService;

  constructor(private userService: UserService,private route: ActivatedRoute,
  	private router: Router,notifierService: NotifierService) {
      this.notifier = notifierService;
     }

  ngOnInit() {
    if(this.userDetails != null){
      this.router.navigate(['/']);
    }else{
         this.route.params.subscribe(params => {
         let userId = params['user_id'];
         let hash   = params['hash'];

         this.userService.resetPassword(userId,hash).subscribe(
          (resp) => {
            if(resp['status_code'] == 200){
              
              this.userData = resp['data'];

            }else{
              this.userData = '';
              this.router.navigate(['/forgot-password']);
            }
          },
          error => {
             this.errorMessage = <any>error
          }

        );
         
       });
    }
  	
  	
  	
  }

  updatePassword(form: NgForm) {
    this.userService.updatePassword(form.value).subscribe(
      (resp) => {
        if(resp['status_code'] == 200){
          
          this.router.navigate(['/login']);

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
