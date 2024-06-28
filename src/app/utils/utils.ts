import { ProductsJson } from '../types/types'
import { writeFileSync } from 'fs';

//Пишет объект в json файл
export const jsonToFile = (obj: object, filename: string) => {
    writeFileSync(`${filename}`, JSON.stringify(obj, null, 2))
}
//убирает null и undefined из ProducrsJson объекта
export function deleteNull(json_object: ProductsJson): ProductsJson {
    let json_empty: ProductsJson = {"products":[]};
    for (let i: number = 0; i < json_object["products"].length; ++i){
        if(json_object["products"][i] != null && json_object["products"][i] != undefined){
            json_empty["products"][json_empty["products"].length] = json_object["products"][i];
        }
    }
    return json_empty;
    
}
//Убирает null и undefined из ProductsJson и записывает в файл products.json
export function deleteNullWrite(json_object: ProductsJson): void {
    jsonToFile(deleteNull(json_object), "src/products.json");
}
//Удаляет null и undefined из объекта
export function deleteNullObj(object: object) : object{
    let json_object: Record <string, any> = object;
    let clean_json: Record<string, any> = {};
    for(let key in object){
        console.log(json_object[key]);
        json_object[key] ? null: json_object[key] = undefined
        if(typeof json_object[key] === 'object'){
            try{
                json_object[key] = deleteNullObj(json_object[key]);
            }
            catch{
            }
        }
        if(json_object[key]){
            clean_json[key] = json_object[key];
        }
    }
    return clean_json;
}
//Удаляет null из json
export function deleteNullJson(json: JSON | object) : JSON | any{
    return deleteNullObj(JSON.parse(JSON.stringify(json)))
}
