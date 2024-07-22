import { Product } from '../../entity/product';
import { Stock } from '../../entity/stocks';
import { NoIdProduct } from '../types/types'
import { myDataSource } from '../data_source/data_source';
import { Any, ArrayContains, Between, FindOperator, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';
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
    findProducts: async (name: any = null, lessThan: any = null, moreThan: any = null,
        status: any = null, description: any = null, sortBy : any = null, 
        sortDirection: any = null, page: any = 1, pageSize: any = 0): Promise<any> => {

        try {
            let sortByOrder = null;
            if ( sortBy in {name: 'name', id: 'id', price: 'price', sale_price: 'sale_price'}){
                sortByOrder = sortBy;
            };

            let sortDirectionOrder = null;
            if ( sortDirection in {ASC: 'ASC', asc: 'asc', DESC: 'DESC', desc: 'desc'}){
                sortDirectionOrder = sortDirection;
            };

            let order = null;
            if (sortDirectionOrder!=null && sortByOrder!=null){
                switch(sortByOrder){
                    case "name":
                        order = {name: sortDirectionOrder};
                    case "id":
                        order = {id: sortDirectionOrder};
                    case "price":
                        order = {price: sortDirectionOrder};
                    case "sale_price":
                        order = {sale_price: sortDirectionOrder}
                }
            }

            let description_find = null;
            if (description){
                description_find = Like(`%${description}%`);
            }

            let name_find = null;
            if (name){
                name_find = Like(`%${name}%`);
            }
            
            let status_find = null;
            if (status != null){
                status_find = ArrayContains([`${status}`]);
            }

            let sale_price_find = null;
            if (lessThan && !moreThan){
                sale_price_find = LessThanOrEqual(lessThan);
            }
            else if(!lessThan && moreThan){
                sale_price_find = MoreThanOrEqual(moreThan);
            }
            else if(lessThan && moreThan){
                sale_price_find = Between(moreThan, lessThan);    
            }
            for (let lll: number = 3; lll < 10; ++lll){
                console.log(name_find);
            }
            
            return await myDataSource.getRepository(Product).find(
                {where: {name: name_find,
                sale_price: sale_price_find,
                description: description_find,
                status: status_find},
                relations: {stock: true},
                take: pageSize,
                skip: pageSize*(page-1),
                order: order}
            );   
            
        }
        catch (e) {
            return {message: "Something went wrong"};
        } 
    },
    //Получить все продукты из БД
    getAllProducts: async (sortBy: any = null, sortDirection: any = null, page: any = 1, pageSize: any = 0) => {
        try {
            let sortByOrder = null;
            if ( sortBy in {name: 'name', id: 'id', price: 'price', sale_price: 'sale_price'}){
                sortByOrder = sortBy;
            };
            let sortDirectionOrder = null;
            if ( sortDirection in {ASC: 'ASC', asc: 'asc', DESC: 'DESC', desc: 'desc'}){
                sortDirectionOrder = sortDirection;
            };
            let order = null;
            if (sortDirectionOrder!=null && sortByOrder!=null){
                switch(sortByOrder){
                    case "name":
                        order = {name: sortDirectionOrder};
                    case "id":
                        order = {id: sortDirectionOrder};
                    case "price":
                        order = {price: sortDirectionOrder};
                    case "sale_price":
                        order = {sale_price: sortDirectionOrder}
                }
            }

            return await myDataSource.getRepository(Product).find({
                take: pageSize,
                skip: pageSize*(page-1),
                relations: {stock: true},
                order: order
            })
        }
        catch (e) {
            return {message: "Something went wrong"};
        }        
    },
    //Получить продукт из БД по ID
    getProduct: async (product_id: string) => {
        try {
            const result = await myDataSource.getRepository(Product).findOne(
                {where: {id: product_id},
                relations: {stock: true}
            })
            if (result){
                return result;
            }
            return {message: "ID не существует"};
        }
        catch (e) {
            return {message: "Не удалось найти продукт"};
        }  
    },
    //Создать продукт и записать его в ДБ
    createProduct: async (new_product: NoIdProduct) => {
        try{
            const stock = myDataSource.getRepository(Stock).create({
                quantity: 0
            });
            await myDataSource.getRepository(Stock).save(stock);
            const product = myDataSource.getRepository(Product).create({
                name: new_product.name,
                image: new_product.image,
                price: new_product.price,
                sale_price: new_product.sale_price,
                status: new_product.status,
                description: new_product.description,
                stock: stock
            });
            const saved = await myDataSource.getRepository(Product).save(product);
            console.log(product);
            console.log(saved);
            
            return { message: "Продукт создан успешно" };
        }
        catch (e) {
            return { message: "Не удалось создать продукт"};   
        }
    },
    //Удалить продукт из БД по ID
    deleteProduct: async (product_id: string) => {
        try {
            await myDataSource.getRepository(Product).delete({id: product_id});
            const product = myDataSource.getRepository(Product).findOne({where: {id: product_id}})
            await myDataSource.getRepository(Stock).delete({id: (await product).stock.id});
            return { message: "Продукт удалён успешно" };
        }
        catch (e) {
            return { message: "Продукта с таким ID не существует"}
        }
    },
    //Обновить продукт из БД по ID
    updateProduct: async (product_id: string, updated_product: NoIdProduct) => {
        try {
            await myDataSource.getRepository(Product).update({id: product_id}, {
                id: product_id,
                name: updated_product.name,
                image: updated_product.image,
                price: updated_product.price,
                sale_price: updated_product.sale_price,
                status: updated_product.status,
                description: updated_product.description,
            })
            const product = myDataSource.getRepository(Product).findOne({where: {id: product_id}})
            await myDataSource.getRepository(Stock).update({id: (await product).stock.id}, {
                quantity: updated_product.quantity

            })
            return { message: "Продукт обновлён успешно" };
        }
        catch (e) {
            return { message: "Продукта с таким ID не существует", e}; 
        }
    }
}