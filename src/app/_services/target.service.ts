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

  	return this.http.post<any>(this.baseUrl + 'api/v1/target/addTarget' , JSON.stringify(data), {

    })
      .pipe(
     // tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

        catchError(this.errorHandl));
  }

// inactive Target
  inActiveTarget(targetId: any){
    var targetData = {
      targetId: targetId
    };
    return this.http.post<any>(this.baseUrl + 'api/v1/target/inActiveTarget' , JSON.stringify(targetData), {

    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
     // tap(),// 

        catchError(this.errorHandl));
  }

  //update target

  updateTarget(data: any){

    return this.http.post<any>(this.baseUrl + 'api/v1/target/updateTarget' , JSON.stringify(data), {

    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      // tap(),// 

        catchError(this.errorHandl));
  }

  // //get single target details
  
   getTargetDetails(targetId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getTarget/' + targetId)
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
   

    return this.http.get<any>(this.baseUrl + 'api/v1/target/usersTargetList/' + userID)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get team target list
  
   getTeamTargetList(teamId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/target/teamTargetList/' + teamId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


   getManagerCreatedTarget(): Observable<any> {

      const helper         = new JwtHelperService();
      const authToken      = localStorage.getItem('authToken');
      const decodedToken   = helper.decodeToken(authToken);
      var userID           = decodedToken['user_id']; 

    return this.http.get<any>(this.baseUrl + 'api/v1/target/getManagerCreatedTarget/' + userID)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }



// get submissions
  getSubmission(startDate:any,endDate:any,teamId:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getSubmissions?startDate=' + startDate + '&endDate=' + endDate + '&teamId=' + teamId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get all teams submissions total
  getAllTeamsSubmissionsTotal(startDate:any,endDate:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getAllTeamsSubmissionsTotal?startDate=' + startDate + '&endDate=' + endDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get teams joining 
  getJoining(startDate:any,endDate:any,teamId:any): Observable<any> {
     // for joining sum according to team
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getJoinings?startDate=' + startDate + '&endDate=' + endDate + '&teamId=' + teamId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get all teams joinings total
  getAllTeamsJoiningsTotal(startDate:any,endDate:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getAllTeamsJoiningsTotal?startDate=' + startDate + '&endDate=' + endDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  // get users job posting
  getJobPosting(startDate:any,endDate:any,teamId:any): Observable<any> {
   // for getting perticular user jobPosting
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getJobPosting?startDate='+ startDate + '&endDate=' + endDate + '&teamId=' + teamId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get all teams job posting total
  getAllTeamsJobPostingTotal(startDate:any,endDate:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getAllTeamsJobPostingTotal?startDate=' + startDate + '&endDate=' + endDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  // get users interviews
  getInterviews(startDate:any,endDate:any,teamId:any): Observable<any> {
   // for getting perticular user jobPosting
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getInterviews?startDate='+ startDate + '&endDate=' + endDate + '&teamId=' + teamId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get all teams interviews total
  getAllTeamsInterviewsTotal(startDate:any,endDate:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getAllTeamsInterviewsTotal?startDate=' + startDate + '&endDate=' + endDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get submissions total 

  getSubmissionsTotal(startDate:any,currentDate:any,userId:any=''): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getSubmissionsTotal/'+ startDate + '/' + currentDate + '/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get job posting total 

  getJobPostingTotal(startDate:any,currentDate:any,userId:any=''): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getJobPostingTotal/'+ startDate + '/' + currentDate + '/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get joining total 

  getJoiningTotal(startDate:any,endDate:any,businessType:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getJoiningTotal/'+ startDate + '/' + endDate + '/' + businessType)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get interview total 

  getInterviewTotal(startDate:any,currentDate:any): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/getInterviewTotal/'+ startDate + '/' + currentDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  // get last six weeks job order(job posting)
   getLastSixWeeksJobOrder(): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/lastSixWeeksJobPosting/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

   // get last six weeks submissions
   getLastSixWeeksSubmissions(): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/lastSixWeeksSubmissions/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

   // get last six weeks interviews
   getLastSixWeeksInterviews(): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/lastSixWeeksInterviews/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

   // get last six weeks joinings(start)
   getLastSixWeeksJoinings(): Observable<any> {
    
    return this.http.get<any>(this.baseUrl + 'api/v1/target/lastSixWeeksJoinings/')
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
