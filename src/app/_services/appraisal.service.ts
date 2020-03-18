import { Injectable } from '@angular/core';
import { Observable, throwError, pipe } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppraisalService {
  baseUrl        = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // add new appraisal
  addAppraisal(data: any){

  	return this.http.post<any>(this.baseUrl + 'levelup/api/v1/appraisal/' , JSON.stringify(data), {

    })
      .pipe(
       tap(data => console.log('authToken' + JSON.stringify(data))),
     //tap(),// 

        catchError(this.errorHandl));
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
