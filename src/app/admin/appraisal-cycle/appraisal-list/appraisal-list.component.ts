import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppraisalService } from 'src/app/_services/appraisal.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-appraisal-list',
  templateUrl: './appraisal-list.component.html',
  styleUrls: ['./appraisal-list.component.css']
})
export class AppraisalListComponent implements OnInit {
  iconUrl        = environment.uploadUrl;
  
  appraisalsList:any;
  errorMessage: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private appraisalService: AppraisalService) { }

  ngOnInit() {
  	//use in data table
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 100,
        "order": [],
      };


     // call get appraisal list function

     this.getAppraisalList();
  }

   getAppraisalList(){
    //get all appraisals details
    this.appraisalService.appraisalList().subscribe(
      resp => {
      	console.log('alist',resp);
        this.appraisalsList = resp['data']; 
        this.dtTrigger.next(); 
      },
      
      error => this.errorMessage = <any>error
    );

  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
