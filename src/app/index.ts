import express, { Router } from 'express';
import { getAllProductsR as getAllProducts, deleteProductR as deleteProduct, updateProductR as updateProduct,
     createProductR as createProduct, getProductR as getProduct } from './controllers/products'
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/api/product/all', getAllProducts);
app.get('/api/product/:id', getProduct);
app.post('/api/product', createProduct);
app.put('/api/product/:id',updateProduct);
app.delete('/api/product/:id',deleteProduct);

export default app