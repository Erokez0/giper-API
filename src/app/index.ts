import express from 'express';
import { productController } from './controllers/products'
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/api/product/all', productController.getAllProducts);
app.get('/api/product/:id', productController.getProduct);
app.post('/api/product', productController.createProduct);
app.put('/api/product/:id', productController.updateProduct);
app.delete('/api/product/:id', productController.deleteProduct);

export default app