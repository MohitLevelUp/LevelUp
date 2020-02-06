import { Component, OnInit } from '@angular/core';
import { CoreValueService } from 'src/app/_services/core-value.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  iconUrl        = environment.uploadUrl;

  newsList: any;
  errorMessage: any;
  constructor(private coreValueService: CoreValueService) { }

  ngOnInit() {
    this.coreValueService.getNews().subscribe(
      res => {
        if(res['status_code'] == 200){
           this.newsList = res['data'];

        }else{
          this.newsList = "";
        }
      },
      
      error => this.errorMessage = <any>error
    );
  }

}
