import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'id'
})
export class IdPipe implements PipeTransform {
    transform(value: any) {
        let id: string = value.toString(10)
        if(id.length === 1) {
          return "00" + id;
        } else if (id.length === 2) {
          return "0" + id;
        } else {
          return id;
        }
    }
}