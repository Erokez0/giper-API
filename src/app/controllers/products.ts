import { productService } from "app/services/products"
import { Request, Response} from 'express'
//POST - /api/product - создание продукта
export async function createProductR(req: any, res: any){ 
   try {
        const payload = req.body;
        const result  = productService.CreateProduct(payload);

        res.send(result)
   } catch (e) {
        res.status(500).send({ message: 'Something went wrong' })
   }
}
 //GET - /api/product/:id - получение информации продукта по id
export function getProductR (req: any, res: any): void {
   try {
        const payload = req.params.id;
        const result = productService.GetProduct(payload);
        res.send(result);
   } catch(e) {
        res.status(500).send({ message: 'Something went wrong' });
   }
}
 //UPDATE - /api/product/:id - обновление продукта с указанным id
export function updateProductR(req: Request, res: Response): void {
   try {
        const ID = req.params.id
        const payload = req.body
        const result = productService.UpdateProduct(ID, payload);
        res.send(result);
   } catch(e) {
        res.status(500).send({ message: 'Something went wrong' });
   }
}
 //DELETE - /api/product/:id - удаление продукта с указанным id
export function deleteProductR(req: Request, res: Response): void {
   try {
        const payload = req.params.id;
        const result = productService.DeleteProduct(payload);
        res.send(result);
   } catch(e) {
        res.status(500).send({ message: 'Something went wrong' });
   }
}
 //GET - /api/product/all - получение всего списка продуктов
export function getAllProductsR(req: Request, res: Response): void{
   try {
        const result = productService.GetAllProducts();
        res.send(result);
   }
   catch(e) {
        res.send({ message: 'Something went wrong' })
   }
}
   

