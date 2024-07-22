import { Product } from '../../entity/product';
import { StockCreate, StockQuantity } from 'app/types/types';
import { Stock } from '../../entity/stocks';
import { myDataSource } from '../data_source/data_source';

export const stockService = {
    createStock: async (newStock: StockCreate) => {
        try {
            const product = await myDataSource.getRepository(Product).findOne({where: 
                {id: newStock.productid}});
            if (product == null){
                return { message: "Продукта с таким ID не существует"};    
            }
        }
        catch (e) {
            return { message: "Продукта с таким ID не существует"};
        }
        try {
            const stock = myDataSource.getRepository(Stock).create({
                quantity: newStock.quantity
            });
            await myDataSource.getRepository(Stock).save(stock);
            await myDataSource.getRepository(Product).update(
                {id: newStock.productid}, 
                {stock: stock});
            return { message: "Остаток создан успешно"};
        }
        catch (e) {
            return { message: "Something went wrong" };
        }
    },
    updateStock: async (stock_id: string, stockQuantity: StockQuantity) => {
        try {
            const stock: Stock = await myDataSource.getRepository(Stock).findOne(
                {where: {id: stock_id}});
            if (stock == null){
                return { message: "Остатка с таким ID не существует" };
            }
        }
        catch (e) {
            return { message: "Остатка с таким ID не существует" };
        }
        try {
            await myDataSource.getRepository(Stock).update(
                {id: stock_id},
                 {quantity: stockQuantity.quantity});
            return { message: "Остаток обновлён успешно"};
        } 
        catch (e) {
            return { message: "Не удалось обновить остаток" };
        }

    },
    getStock: async (stock_id: string): Promise<Object | Stock> => {
        try {
            const stock: Stock = await myDataSource.getRepository(Stock).findOne(
                {where: {id: stock_id}});

            if (stock==null){
                return { message: "Не удалось найти остаток" };
            }
            return stock;
        }
        catch (e) {
            return { message: "Не удалось найти остаток" };
        }

    },
    deleteStock: async (stock_id: string) => {
        try{
            const stock = await myDataSource.getRepository(Stock).findOne(
                {where: {id: stock_id}});
            if (stock == null){
                return { message: "Остатка с таким ID не существует" };
            }
        }
        catch (e) {
            return { message: "Остатка с таким ID не существует" };
        }

        try {
            await myDataSource.getRepository(Stock).delete(
                    {id: stock_id});
            return { message: "Остаток успешно удалён"};
        }
        catch (e) {
            return { message: "Не удалось удалить остаток" };
        }
    }
}