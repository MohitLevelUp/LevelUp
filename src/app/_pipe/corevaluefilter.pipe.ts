import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class CorevaluefilterPipe implements PipeTransform {


 transform(coreValuesList: any[], filter: any): any {
        if (!coreValuesList || !filter) {
            return coreValuesList;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return coreValuesList.filter(item => item.id.indexOf(filter.id) == -1);
    }

}
