import { productService } from '../services/products';
import { Request, Response} from 'express'

export const productController = {
     dbtest: async (req: Request, res: Response) => {
          try {
               const payload = await productService.DBtest();
               console.log("Ответ сохранённого продукта отправлен в контроллер");
               res.json(payload);
          }
          catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
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
               const result= await productService.getAllProducts();
               res.json(result);
          }
          catch(e) {
               res.json({ message: 'Something went wrong' })
          }
     }
}