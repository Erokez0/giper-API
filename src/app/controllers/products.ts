import { productService } from '../services/products';
import { Request, Response } from 'express';

export const productController = {
     findProducts: async (req: Request, res: Response) => {
          try {
               const sortBy = req.query.sortBy;
               const sortDirection = req.query.sortDirection;
               const description = req.query.description;
               const tag = req.query.tag
               const lessThan = req.query.lessThan;
               const moreThan = req.query.moreThan;
               const page = req.query.page;
               const pageSize = req.query.pageSize
               const name = req.query.name
               const result = await productService.findProducts(name, lessThan, moreThan, status, description, sortBy, sortDirection, page, pageSize);
               if (result.length > 0){
                    res.json(result)
               }
               else{
                    res.send({ message: "Продуктов не найдено"})
               }
          }
          catch (e) {
               res.status(500).send({message: `Something went wrong ${e}`});
          }
     },
     createProduct: async (req: Request, res: Response) => {
          try {
               const payload = req.body;
               const result  = await productService.createProduct(payload);
               res.send(result);
          } catch (e) {
               res.status(500).send({ message: 'Something went wrong' });
          }  
     },
     getProduct: async (req: Request, res: Response) => {
          try {
               const payload = req.params.id;
               const result = await productService.getProduct(payload);
               res.send(result);
          } catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
          }
     },
     updateProduct: async (req: Request, res: Response) =>{
          try {
               const ID = req.params.id
               const payload = req.body
               const result = await productService.updateProduct(ID, payload);
               res.send(result);
          } catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
          }
     },
     deleteProduct: async (req: Request, res: Response) => {
          try {
               const payload = req.params.id;
               const result = await productService.deleteProduct(payload);
               res.json(result);
          } catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
          }
     },
     getAllProducts: async (req: Request, res: Response) => {
          try {
               const sortBy = req.query.sortBy;
               const sortDirection = req.query.sortDirection;
               const page = req.query.page;
               const pageSize = req.query.pageSize
               const result = await productService.getAllProducts(sortBy, sortDirection, page, pageSize);
               res.json(result);
          }
          catch(e) {
               res.json({ message: 'Something went wrong' })
          }
     }
}