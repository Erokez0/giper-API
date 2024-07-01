import { productService } from '../services/products';
import { Request, Response} from 'express'

export const productController = {
     dbtest: (req: Request, res: Response) => {
          try {
               const payload = productService.DBtest();
               res.send(payload);
          }
          catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
          }
     },
     createProduct: (req: Request, res: Response) => {
          try {
               const payload = req.body;
               const result  = productService.CreateProduct(payload);
       
               res.send(result)
          } catch (e) {
               res.status(500).send({ message: 'Something went wrong' });
          }  
     },
     getProduct: (req: Request, res: Response) => {
          try {
               const payload = req.params.id;
               const result = productService.GetProduct(payload);
               res.send(result);
          } catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
          }
     },
     updateProduct: (req: Request, res: Response) =>{
          try {
               const ID = req.params.id
               const payload = req.body
               const result = productService.UpdateProduct(ID, payload);
               res.send(result);
          } catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
          }
     },
     deleteProduct: (req: Request, res: Response) => {
          try {
               const payload = req.params.id;
               const result = productService.DeleteProduct(payload);
               res.send(result);
          } catch(e) {
               res.status(500).send({ message: 'Something went wrong' });
          }
     },
     getAllProducts: (req: Request, res: Response) => {
          try {
               const result = productService.GetAllProducts();
               res.send(result);
          }
          catch(e) {
               res.send({ message: 'Something went wrong' })
          }
     }
}