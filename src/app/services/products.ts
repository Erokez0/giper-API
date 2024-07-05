import { Product } from '../../entity/product';
import { NoIdProduct, ProductsJson } from '../types/types'
import { jsonToFile, deleteNullWrite } from '../utils/utils';
import { myDataSource } from '../data_source/data_source';
import { Like } from 'typeorm';
console.log('products loaded successfully');

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

export const productService = {
    //Найти все продукты имеющие в названии запрос
    findProducts: async (request: string): Promise<any> => {
        try {
            console.log(myDataSource.getRepository(Product).find(
                {where: {name: Like(`%${request}%`)}}
            ));
            return await myDataSource.getRepository(Product).find(
                {where: {name: Like(`%${request}%`)}}
            );
        }
        catch (e) {
            return {message: "ХЗ"};
        } 
    },
    //Получить все продукты из БД
    getAllProducts: async () => {
        try {
            console.log(myDataSource.getRepository(Product).find())
            return await myDataSource.getRepository(Product).find()
        }
        catch (e) {
            return {message: "ID не существует"};
        }        
    },
    //Получить продукт из БД по ID
    getProduct: async (product_id: string) => {
        try {
            console.log(myDataSource.getRepository(Product).find())
            return await myDataSource.getRepository(Product).findOne(
                {where: {id: product_id}
            })
        }
        catch (e) {
            return {message: "ID не существует"};
        }  
    },
    //Создать продукт и записать его в ДБ
    createProduct: async (new_product: NoIdProduct) => {
        const product = myDataSource.getRepository(Product).create({
            name: new_product.name,
            image: new_product.image,
            price: new_product.price,
            sale_price: new_product.sale_price,
            status: new_product.status,
            description: new_product.description
        })
        const repository = myDataSource.getRepository(Product);
        try{
            await repository.save(product);
            return { message: "Продукт создан успешно" };
        }
        catch (e) {
            return { message: "Не удалось создать продукт" };   
        }
    },
    //Удалить продукт из БД по ID
    deleteProduct: async (product_id: string) => {
        const repository = myDataSource.getRepository(Product);
        try {
            const productWithId = await repository.findOne(
                {where: 
                    {id: product_id}});
            await repository.delete({id: product_id});
            return { message: "Продукт удалён успешно" };
        }
        catch (e) {
            return { message: "Продукта с таким ID не существует"}
        }
    },
    //Обновить продукт из БД по ID
    updateProduct: async (product_id: string, updated_product: NoIdProduct) => {
        const repository = myDataSource.getRepository(Product);
        try {
            await repository.findOne(
                {where: 
                    {id: product_id}})
                    const product = myDataSource.getRepository(Product).create({
                        id: product_id,
                        name: updated_product.name,
                        image: updated_product.image,
                        price: updated_product.price,
                        sale_price: updated_product.sale_price,
                        status: updated_product.status,
                        description: updated_product.description
                    })
                    await repository.save(product);
                    return { message: "Продукт обновлён успешно" };
        }
        catch (e) {
            return { message: "Продукта с таким ID не существует"}; 
        }
    }
}