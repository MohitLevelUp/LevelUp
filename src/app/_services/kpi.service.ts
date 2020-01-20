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
export class KpiService {
  baseUrl        = environment.apiUrl;
  helper         = new JwtHelperService();
  authToken      = localStorage.getItem('authToken');
  decodedToken   = this.helper.decodeToken(this.authToken);
  userId         = this.decodedToken['user_id'];
  teamId         = this.decodedToken['team_id'];

  constructor(private http: HttpClient, private router: Router) { }

// add new kpi
  addKpi(data: any){

  	return this.http.post<any>(this.baseUrl + 'levelup/api/v1/kpi/' , JSON.stringify(data), {

    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
     // tap(),// 

        catchError(this.errorHandl));
  }

// update kpi
  updateKpi(data: any){

    return this.http.post<any>(this.baseUrl + 'levelup/api/v1/kpi/updatekpi' , JSON.stringify(data), {

    })
      .pipe(
      tap(),// 

        catchError(this.errorHandl));
  }

  // GET admin/manager created kpi List
  createdKpiList(): Observable<any> {
    var userID = this.userId;
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/kpi/createdKpiList/' + userID)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  // GET user and his/her team assign KPI List
  getAssignedKpiList(user_id:any): Observable<any> {
    if(user_id == ''){
      var userID = this.userId;
    }else{
      userID = user_id;
    }
  	

    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/kpi/assignedKpiList/' + userID)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }



  //inactive kpi

  inActiveKpi(kpiId: any){
    var kpiData = {
      kpiId: kpiId
    };
  	return this.http.post<any>(this.baseUrl + 'levelup/api/v1/kpi/inActiveKpi' , JSON.stringify(kpiData), {

    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
     // tap(),// 

        catchError(this.errorHandl));
  }

  

  //assign kpi to user or team
  assignKpi(data: any){
    
  	return this.http.post<any>(this.baseUrl + 'levelup/api/v1/kpi/assignKpi' , JSON.stringify(data), {

    })
      .pipe(
      tap(data => console.log('authToken' + JSON.stringify(data))),
     // tap(),// 

        catchError(this.errorHandl));
  }

  

  //get single kpi details
  
   getKpiDetails(kpiId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/kpi/' + kpiId)
    .pipe(
      retry(1),
     catchError(this.errorHandl)
    )
  }

  //get period list
  
   getPeriodList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'levelup/api/v1/kpi/periodList')
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
