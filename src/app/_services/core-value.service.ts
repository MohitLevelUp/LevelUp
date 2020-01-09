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

  helper         = new JwtHelperService();
  authToken      = localStorage.getItem('authToken');
  decodedToken   = this.helper.decodeToken(this.authToken);
  userID         = this.decodedToken['user_id'];

  constructor(private http: HttpClient, private router: Router) { }
  
  filterUser(corevalue: any) {
    return corevalue.id == 10
  }
 //add core value
  addcoreValue(data: any) {

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/corevalue/' , JSON.stringify(data), {
    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      //tap(),// 

        catchError(this.errorHandl));
  }

 //Core value list

  corevalueList(): Observable<any> {


    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/corevalue/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }




  //Give core value
  giveCoreValue(data: any) {

  var coreValueData = {
      given_by: this.userID,
      given_to: data.givenTo,
      core_value_id:data.coreValueId,
      why_given:data.whyGiven
    };

    console.log(coreValueData);

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/corevalue/givenCoreValue' , JSON.stringify(coreValueData), {
    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      //tap(),// 

        catchError(this.errorHandl));
  }

  

  //get user given Core values

  getUserGivenCoreValues(): Observable<any> {
    var userId = this.userID;

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/corevalue/getUserGivenCoreValues/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get user receive Core values

  getUserReceiveCoreValues(): Observable<any> {
    var userId = this.userID;

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/corevalue/getUserReceiveCoreValues/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get kudos stickers list
  
  getKudosStickerList(): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/corevalue/getKudosStickersList/')
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  

   //Give Kudos
  giveKudos(data: any) {

  var kudosData = {
      given_by: this.userID,
      given_to: data.givenTo,
      kudos_id:data.kudosId,
      why_given:data.whyGiven
    };

  return this.http.post<any>(this.baseUrl + 'levelup/api/v1/corevalue/giveKudos' , JSON.stringify(kudosData), {
    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
      //tap(),// 

        catchError(this.errorHandl));
  }

  //get user given kudos

  getUserGivenKudos(): Observable<any> {
    var userId = this.userID;

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/corevalue/getUserGivenKudos/' + userId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get user receive Kudos
  
  getUserReceiveKudos(): Observable<any> {
    var userId = this.userID;

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/corevalue/getUserReceiveKudos/' + userId)
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
