import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'dec'
})
export class DecPipe implements PipeTransform {
    transform(value: any) {
        return value / 10;
    }
}