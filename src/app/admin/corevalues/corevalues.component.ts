import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-corevalues',
  templateUrl: './corevalues.component.html', 
  styleUrls: ['./corevalues.component.css']
})
export class CorevaluesComponent implements OnInit {

  iconUrl        = environment.uploadUrl;

  coreValuesList: any;

  private readonly notifier: NotifierService;
  corevaluename: any = ""; 

  base64textString: any ="";
  successMessage: any;
  errorMessage: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: Http, private coreValueService: CoreValueService,
    notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  //get file and conver it in base64 encode
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
    }
  
  
  add(form: NgForm) {
    this.coreValueService.addcoreValue(form.value).subscribe(
      (resp) => {
        if(resp['status_code'] == 200){
           this.successMessage = resp.message;
           this.notifier.show({
              type: "success",
              message: this.successMessage,
           });
          this.getCoreValueList();
        }else{
           this.errorMessage = resp.message;
           this.notifier.show({
              type: "error",
              message: this.errorMessage,
           });
        }
      },
      error => {
         this.errorMessage = <any>error
      }

    );
    form.resetForm();
  }

  // getting all core Value's list
  getCoreValueList(){
    this.coreValueService.corevalueList().subscribe(
      resp => {
        this.coreValuesList = resp['data'];   
        //this.dtTrigger.next();
      },
      
      error => this.errorMessage = <any>error
    );
  }
  ngOnInit() {
     // call function getting all core Value's list
    this.getCoreValueList();

     this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 100,
    };

    

     
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
