// import { json } from 'express';
import products from '../../products.json';
import { ProductsJson } from '../types/types'
import { jsonToFile, deleteNullWrite } from 'app/utils/utils';

console.log('products loaded successfully');

export const productService = {
    //Получить продукт по ID
    GetProduct: (product_id: string) => {
        let json_object: ProductsJson = products;
        for( let i: number = 0; i < json_object["products"].length; ++i){
            if (json_object["products"][i]["id"] === product_id){
                return json_object["products"][i];
            }
        }
        return JSON.stringify("ID не существует");
    },
    //Получить все продукты
    GetAllProducts: () => {

        return products["products"];  
    },
    //Создать продукт
    CreateProduct: (new_product: ProductsJson) => {
        let json_object: ProductsJson = products;
        if(new_product["products"][0]["id"] === "all" || null || undefined){
            return JSON.stringify("ID неправильный или не существует");
        }
        for(let i: number = 0; i < json_object["products"].length; ++i){
            if(json_object["products"][i]["id"] === new_product["products"][0]["id"]){
                return JSON.stringify("Продукт с таким ID уже существует");
            }
        }
        try{
            products["products"][products['products'].length] = new_product["products"][0];
            jsonToFile(json_object, "src/products.json");
            return JSON.stringify("Продукт успешно создан");
        }
        catch{
            return JSON.stringify("Не удалось создать продукт");
        }
    },
    //Удалить продукт
    DeleteProduct: (product_id: string) => {
        let json_object: ProductsJson = products;
        for( let i: number = 0; i < json_object["products"].length; ++i){
            if(json_object["products"][i]["id"] === product_id){
                try{
                    delete json_object["products"][i];
                    jsonToFile(json_object, "src/products.json");
                    deleteNullWrite(json_object);
                    return JSON.stringify("Продукт успешно удалён");
                }
                catch{
                    return JSON.stringify("Не удалость удалить продукт");
                }
            }
        }
        return JSON.stringify("ID не существует");
    },
    //Обновить продукт
    UpdateProduct: (product_id: string, updated_product: ProductsJson) => {
        let json_object: ProductsJson = products;
        for(let i: number = 0; i < json_object["products"].length; ++i){
            if(json_object["products"][i]["id"] === product_id){
                try{
                    json_object["products"][i] = updated_product["products"][0];
                    return JSON.stringify("Продукт обновлён успешно")  
                }
                catch{
                    return JSON.stringify("Не удалось обновить продукт");
                }
            }
        }
        return JSON.stringify("ID не существует")
    }


}