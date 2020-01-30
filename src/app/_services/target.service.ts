import { Injectable } from '@angular/core';
import { Observable, throwError, pipe } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService  }  from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  baseUrl        = environment.apiUrl;
  // helper         = new JwtHelperService();
  // authToken      = localStorage.getItem('authToken');
  // decodedToken   = this.helper.decodeToken(this.authToken);
  // userId         = this.decodedToken['user_id'];
  // teamId         = this.decodedToken['team_id'];

  userProfile    = JSON.parse(localStorage.getItem('user'));

  constructor(private http: HttpClient, private router: Router) { }

  //add target

  addTarget(data: any){

  	return this.http.post<any>(this.baseUrl + 'levelup/api/v1/target/addTarget' , JSON.stringify(data), {

    })
      .pipe(
     // tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

        catchError(this.errorHandl));
  }

  //update target

  updateTarget(data: any){

    return this.http.post<any>(this.baseUrl + 'levelup/api/v1/target/updateTarget' , JSON.stringify(data), {

    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      // tap(),// 

        catchError(this.errorHandl));
  }

  // //get single target details
  
   getTargetDetails(targetId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/getTarget/' + targetId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // GET user and his/her team assign target List
  getUsersTargetList(user_id:any): Observable<any> {
    if(user_id == ''){
      const helper         = new JwtHelperService();
      const authToken      = localStorage.getItem('authToken');
      const decodedToken   = helper.decodeToken(authToken);
      var userID           = decodedToken['user_id']; 
    }else{
      userID = user_id;
    }
   

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/usersTargetList/' + userID)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get team target list
  
   getTeamTargetList(teamId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/teamTargetList/' + teamId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


   getTargetList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/getTarget')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

// get users submissions 
  currentMonthtotalSubmission(month_sd:any,month_ed:any): Observable<any> {
    // get current Month submission

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/usersSubmission/' + month_sd + '/' + month_ed)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get last year users submissions 
  totalSubmission(year_sd:any,year_ed:any): Observable<any> {
    // get current Month submission

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/getSubmissionsList/' + year_sd + '/' + year_ed)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  

  // get last month total joining 
  lastMonthTotalJoining(): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/lastMonthtotalJoining')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get total job posting according to date
  totalJobPosting(startDate:any,currentDate:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/totalJobPosting/'+ startDate + '/' + currentDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get total joining according to date
  totalJoining(startDate:any,currentDate:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/totalJoining/'+ startDate + '/' + currentDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }
 
  // get submissions total 

  getSubmissionsTotal(startDate:any,currentDate:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/getSubmissionsTotal/'+ startDate + '/' + currentDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get job posting total 

  getJobPostingTotal(startDate:any,currentDate:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/getJobPostingTotal/'+ startDate + '/' + currentDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get joining total 

  getJoiningTotal(startDate:any,currentDate:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/getJoiningTotal/'+ startDate + '/' + currentDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get interview total 

  getInterviewTotal(startDate:any,currentDate:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/target/getInterviewTotal/'+ startDate + '/' + currentDate)
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
