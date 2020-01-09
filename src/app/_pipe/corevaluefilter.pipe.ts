import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corevaluefilter'
})
export class CorevaluefilterPipe implements PipeTransform {

  transform(items: any[], corevaluefilter: (item: any) => boolean): any {
        if (!items || !corevaluefilter) {
            return items;
        }
        return items.filter(item => corevaluefilter(item));
    }

}
