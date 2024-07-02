import { Product } from '../../entity/product';
import products from '../../products.json';
import { NoIdProduct, ProductsJson } from '../types/types'
import { jsonToFile, deleteNullWrite } from '../utils/utils';
import { myDataSource } from '../data_source/data_source';
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
    DBtest: async () => {
        const product = new Product();
        product.name = 'default';
        product.description = 'string';
        product.image = 'image';
        product.price = 10;
        product.sale_price = 5;
        product.status = ['bestseller'];
        console.log("Продукт задан");
        try {
            const repository = myDataSource.getRepository(Product);
            await repository.save(product);
            console.log("Продукт сохранён:", product);
            console.log(myDataSource.getRepository(Product).find())
            return await myDataSource.getRepository(Product).find()
        }
        catch (e) {
            return `Ошибка`;
        }        
    },
    //Получить все продукты из БД
    getAllProducts: async () => {
        try {
            console.log(myDataSource.getRepository(Product).find())
            return await myDataSource.getRepository(Product).find()
        }
        catch (e) {
            return {message: "Ошибка"};
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
        let product = new Product();
        product.name = new_product.name;
        product.description = new_product.description;
        product.image = new_product.image;
        product.price = new_product.price;
        product.sale_price = new_product.sale_price;
        product.status = new_product.status;
        const repository = myDataSource.getRepository(Product);
        if (await repository.save(product)){
            console.log(1);
            return { message: "Продукт создан успешно" };
        }
        else{
            console.log(2)
            return { message: "Не удалось создать продукт" };
        }

    },
    //Удалить продукт из БД по ID
    deleteProduct: async (product_id: string) => {
        const repository = myDataSource.getRepository(Product);
        if (!await repository.findOne(
            {where: 
                {id: product_id}})){
            return { message: "Продукта с таким ID не существует"};
        }
        await repository.delete({id: product_id});
        return { message: "Продукт удалён успешно" };
    },
    //Обновить продукт из БД по ID
    updateProduct: async (product_id: string, updated_product: NoIdProduct) => {
        const repository = myDataSource.getRepository(Product);
        if (!await repository.findOne(
            {where: 
                {id: product_id}})){
            return { message: "Продукта с таким ID не существует"};
            }
        let product = new Product;
        product.id = product_id;
        product.name = updated_product.name;
        product.image = updated_product.image;
        product.price = updated_product.price;
        product.sale_price = updated_product.sale_price;
        product.status = updated_product.status;
        product.description = updated_product.description;
        await repository.save(product);
        return { message: "Продукт обновлён успешно" };
    },
}