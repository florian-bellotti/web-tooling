import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'mapToIterable'})
export class MapToIterable implements PipeTransform {
    transform(map: { [key: string]: any }, ...parameters: any[]) {
        if (!map) {
            return undefined;
        }
        return Object.keys(map)
            .map(key => {
                if (key !== 'user') {
                    if (!isNaN(parseFloat(map[key])) && isFinite(map[key])) {
                        let arrondi = map[key] * 100;
                        arrondi = Math.round(arrondi);
                        return arrondi / 100;
                    }
                    return map[key]
                } else {
                    return undefined
                }});
    }
}
