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
export class PointsService {
  baseUrl        = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { 

  }


  // get job orders points
  getJobOrdersPoints(startDate:any,endDate:any,userId:any=''): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/points/getJobOrdersPoints?startDate=' + startDate + '&endDate=' + endDate + '&userId=' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get submissions points
  getSubmissionsPoints(startDate:any,endDate:any,userId:any=''): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/points/getSubmissionsPoints?startDate=' + startDate + '&endDate=' + endDate + '&userId=' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get interviews points
  getInterviewsPoints(startDate:any,endDate:any,userId:any=''): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/points/getInterviewsPoints?startDate=' + startDate + '&endDate=' + endDate + '&userId=' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  // get joinings points
  getJoiningsPoints(startDate:any,endDate:any,userId:any=''): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/points/getJoiningsPoints?startDate=' + startDate + '&endDate=' + endDate + '&userId=' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // get last six weeks points
  getLastSixWeekPoint(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/points/lastSixWeekPoints')
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
