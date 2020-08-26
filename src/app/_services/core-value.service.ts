import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError, pipe } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService  }  from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CoreValueService {
  baseUrl        = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {

   }
  
  filterUser(corevalue: any) {
    return corevalue.id == 10
  }
 //add core value
  addcoreValue(data: any) {

  return this.http.post<any>(this.baseUrl + 'api/v1/corevalue/' , JSON.stringify(data), {
    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      //tap(),// 

        catchError(this.errorHandl));
  }

 //Core value list

  corevalueList(): Observable<any> {


    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }




  //Give core value
  giveCoreValue(data: any) {
  var helper         = new JwtHelperService();
  var authToken      = localStorage.getItem('authToken');
  var decodedToken   = helper.decodeToken(authToken);
  var userID         = decodedToken['user_id'];

  var coreValueData = {
      given_by: userID,
      given_to: data.givenTo,
      core_value_id:data.coreValueId,
      why_given:data.whyGiven
    };

    // console.log(coreValueData);

  return this.http.post<any>(this.baseUrl + 'api/v1/corevalue/givenCoreValue' , JSON.stringify(coreValueData), {
    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      //tap(),// 

        catchError(this.errorHandl));
  }

  

  //get user given Core values

  getUserGivenCoreValues(): Observable<any> {
    var helper         = new JwtHelperService();
    var authToken      = localStorage.getItem('authToken');
    var decodedToken   = helper.decodeToken(authToken);
    var userID         = decodedToken['user_id'];

    var userId = userID;

    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/getUserGivenCoreValues/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get user receive Core values

  getUserReceiveCoreValues(): Observable<any> {
    var helper         = new JwtHelperService();
    var authToken      = localStorage.getItem('authToken');
    var decodedToken   = helper.decodeToken(authToken);
    var userID         = decodedToken['user_id'];

    var userId = userID;

    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/getUserReceiveCoreValues/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


   //get user's team work total stickers
  
  getTeamWorkTotalReceived(userId:any): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/getTeamWorkTotal?userId=' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  //get kudos stickers list
  
  getKudosStickerList(): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/getKudosStickersList/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  

   //Give Kudos
  giveKudos(data: any) {
  var helper         = new JwtHelperService();
  var authToken      = localStorage.getItem('authToken');
  var decodedToken   = helper.decodeToken(authToken);
  var userID         = decodedToken['user_id'];

  var kudosData = {
      given_by: userID,
      given_to: data.givenToKudos,
      kudos_id:data.kudosId,
      why_given:data.whyGivenKudos
    };

  return this.http.post<any>(this.baseUrl + 'api/v1/corevalue/giveKudos' , JSON.stringify(kudosData), {
    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      //tap(),// 

        catchError(this.errorHandl));
  }

  //get user given kudos

  getUserGivenKudos(): Observable<any> {
    var helper         = new JwtHelperService();
    var authToken      = localStorage.getItem('authToken');
    var decodedToken   = helper.decodeToken(authToken);
    var userID         = decodedToken['user_id'];
    var userId = userID;

    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/getUserGivenKudos/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get user receive Kudos
  
  getUserReceiveKudos(): Observable<any> {
    var helper         = new JwtHelperService();
    var authToken      = localStorage.getItem('authToken');
    var decodedToken   = helper.decodeToken(authToken);
    var userID         = decodedToken['user_id'];
    var userId = userID;

    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/getUserReceiveKudos/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

// news section start 

  //add core value
  addNews(data: any) {
  var helper         = new JwtHelperService();
  var authToken      = localStorage.getItem('authToken');
  var decodedToken   = helper.decodeToken(authToken);
  var userID         = decodedToken['user_id'];
  var newsData = {
      written_by: userID,
      user_id:data.userId,
      news:data.breaking_news
    };
  return this.http.post<any>(this.baseUrl + 'api/v1/corevalue/addNews' , JSON.stringify(newsData), {
    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      //tap(),// 

        catchError(this.errorHandl));
  }

  //get user receive Kudos
  
  getNews(): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/getNews/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  //get corevalue topers
  
  getCoreValueTopers(startDate:any,endDate:any,): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/topers/' + startDate + '/' + endDate)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  getToppersList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/toppersDetails')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }


  // high five 

  sendHighFive(data: any) {
  
  return this.http.post<any>(this.baseUrl + 'api/v1/corevalue/sendHighFive' , JSON.stringify(data), {
    })
      .pipe(
      // tap(data => console.log('authToken' + JSON.stringify(data))),
      tap(),// 

      catchError(this.errorHandl));
  }

  // getting sent high five total

  highFiveTotal(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/v1/corevalue/highFiveTotal')
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
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
