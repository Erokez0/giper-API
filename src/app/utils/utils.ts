import { Product, ProductsJson } from '../types/types'
import { writeFileSync, readFileSync } from 'fs';

export const jsonToFile = (obj: object, filename: string) => {
    writeFileSync(`${filename}`, JSON.stringify(obj, null, 2))
}
export function deleteNull(json_object: ProductsJson): ProductsJson {
    let json_empty: ProductsJson = {"products":[]};
    for ( let i: number = 0; i < json_object["products"].length; ++i){
        if(json_object["products"][i] != null && json_object["products"][i] != undefined){
            json_empty["products"][json_empty["products"].length] = json_object["products"][i];
            console.log(json_empty);
            jsonToFile(json_empty, "src/products.json");
        }
    }
    return json_empty;
    
}
export function deleteNullWrite(json_object: ProductsJson): void {
    jsonToFile(deleteNull(json_object), "src/products.json");
}