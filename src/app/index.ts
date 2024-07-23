import express from 'express';
import { productController } from './controllers/products'
import { stockController } from './controllers/stocks';
import { userController } from './controllers/users';
import bodyParser from 'body-parser';
import passport from 'passport';
import './middleware/passport';

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
//Пользователи
app.post('/api/user/signup', userController.createUser);
app.post('/api/user/login', userController.signIn);
app.patch('/api/user/:id', 
    passport.authenticate('bearer', { session: false }),
    userController.updateUser);

app.delete('/api/user/:id',
     passport.authenticate('bearer', { session: false }),
      userController.deleteUser);
app.get('/api/user/all',
      userController.getAllUsers);
app.get('/api/me',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.json(req.user);
});
//Остатки
app.post('/api/stock', stockController.createStock);
app.get('/api/stock/:id', stockController.getStock);
app.delete('/api/stock/:id', stockController.deleteStock);
app.patch('/api/stock/:id', stockController.updateStock);

//Продукты
app.get('/api/product/find/', productController.findProducts);
app.get('/api/product/all', productController.getAllProducts);
app.get('/api/product/:id', productController.getProduct);
app.post('/api/product', productController.createProduct);
app.put('/api/product/:id', productController.updateProduct);
app.delete('/api/product/:id', productController.deleteProduct);

export default app