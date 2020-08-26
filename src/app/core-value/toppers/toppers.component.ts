import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {
  iconUrl        = environment.uploadUrl;
  
  toppersList:any;
  errorMessage: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  toppersDetails     = [];

  constructor(private coreValueService: CoreValueService) { }

  ngOnInit() {
  	//use in data table
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 100,
        "order": [],
      };

      this.getToppersList();
  }

   //get toppers list
  getToppersList(){

    this.coreValueService.getToppersList().subscribe(
      resp => {
        if(resp['status_code'] == 200){
           this.toppersList = resp['data'];
           
           for(let i=0; i<this.toppersList.length; i++) {

                for(let j=0; j<this.toppersList[i].length; j++){
                	
                	this.toppersDetails.push(this.toppersList[i][j]);
                }

              }

            this.dtTrigger.next();

        }else{
          this.toppersList = "";
        }
      },
      
      error => this.errorMessage = <any>error
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
