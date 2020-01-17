
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IUser } from 'src/app/_models/user';
import { environment } from '../../environments/environment';
import { Observable, throwError, pipe } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService  }  from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class UserService {
   baseUrl        = environment.apiUrl;
   // helper         = new JwtHelperService();
   // authToken      = localStorage.getItem('authToken');
   // decodedToken   = this.helper.decodeToken(this.authToken);
  	

  constructor(private http: HttpClient, private router: Router) { }

  signIn(data: any) {

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/signin/' , JSON.stringify(data), {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
      //   'Access-Control-Max-Age':'1000',
      //   'Cache-Control':'no-cache'

      // })

    })
      .pipe(
      //tap(data => console.log('authToken' + JSON.stringify(data.data.token))),
      tap(),// 

        catchError(this.errorHandl));
  }

// sign Up
  signUp(data: any) {

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/signUp/' , JSON.stringify(data), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
}



  // GET user through id
  getUser(userID:any): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + 'levelup/api/v1/user/' + userID)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }



  // GET user List
  userList(): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + 'levelup/api/v1/user/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }




  // update user detials
  updateUser(data:any): Observable<IUser> {

      return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/updateProfile/', JSON.stringify(data), {

    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
     // tap(),// 

        catchError(this.errorHandl));
  }



  updateUserImage(data:any, user_id): Observable<any> {
   // const helper         = new JwtHelperService();
   // const authToken      = localStorage.getItem('authToken');
   // const decodedToken   = helper.decodeToken(authToken);
   // var userID           = decodedToken['user_id'];
  
  	var userImageData = {
      user_id: user_id,
      profile_image: data,
    };


      return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/updateUserImage/', JSON.stringify(userImageData), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
  }

// forgot password
  
  forgotPassword(data: any) {

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/forgotPassword/' , JSON.stringify(data), {

    })
      .pipe(
      //tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

        catchError(this.errorHandl));
}


resetPassword(userId: any, hash:any) {
  var data = {
      user_id: userId,
      hash: hash,
    };

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/resetPassword/' , JSON.stringify(data), {

    })
      .pipe(
     // tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

        catchError(this.errorHandl));
}

// update password
updatePassword(data: any) {

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/saveUpdatePassword/' , JSON.stringify(data), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
}

// get all comapny list
  
  companyList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/user/getCompanyList')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //create new user
  createUser(data: any) {

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/createUser/' , JSON.stringify(data), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
}

 //select team to user
 addUserToTeam(data: any) {
  
  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/addToTeam/' , JSON.stringify(data), {

    })
      .pipe(
      // tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

        catchError(this.errorHandl));
}



//inactive user
 inactiveUser(user_Id: any) {
 var data = {
      userId: user_Id,
    };
  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/inactiveUser/' , JSON.stringify(data), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
}

// make user to admin

 makeAdmin(user_Id: any) {
 var data = {
      userId: user_Id,
    };
  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/makeAdmin/' , JSON.stringify(data), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
}


  
  // user remove from admin

 removeAdmin(user_Id: any) {
 var data = {
      userId: user_Id,
    };
  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/user/removeAdmin/' , JSON.stringify(data), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
}


  isLoggedIn(){
  	const helper = new JwtHelperService();
    let authToken = localStorage.getItem('authToken');

    if(!authToken)
     return false;

    const decodedToken = helper.decodeToken(authToken);
    const expirationDate = helper.getTokenExpirationDate(authToken);
    const isExpired = helper.isTokenExpired(authToken);

    return !isExpired;

  }

  logout() {
    // localStorage.clear();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.navigate(['/'])
    
  }

  //add team

  addTeam(data: any) {
  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/team/' , JSON.stringify(data), {

    })
      .pipe(
    //  tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

        catchError(this.errorHandl));
  }


 //update Team detials
  updateTeam(data: any) {
  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/team/updateTeam' , JSON.stringify(data), {

    })
      .pipe(
     tap(data => console.log('authToken' + JSON.stringify(data))),
     // tap(),// 

        catchError(this.errorHandl));
  }

  //delete team
  deleteTeam(data: any) {
  	 var team_id = {
        team_id: data,
        
      };
  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/team/deleteTeam' , JSON.stringify(team_id), {

    })
      .pipe(
     tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

        catchError(this.errorHandl));
  }



  // GET team List
  teamList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/team/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get single team details
  
   getTeamDetails(teamId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/team/' + teamId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  

   // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     //console.log(errorMessage);
     return throwError(errorMessage);
  }

}
