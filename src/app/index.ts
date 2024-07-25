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
app.post('/api/user/login', userController.logIn);
app.patch('/api/user/:id', 
    passport.authenticate('bearer', { session: false }),
    userController.updateUser);
app.delete('/api/user/:id',
    passport.authenticate('bearer', { session: false }),
    userController.deleteUser);
app.get('/api/user/all',
    passport.authenticate('bearer', { session: false }),
    userController.getAllUsers);
app.get('/api/me',
    passport.authenticate('bearer', { session: false }),
    (req, res, next) => {
        res.send(req.user);
});
//Остатки
app.post('/api/stock',
    passport.authenticate('bearer', { session: false }),
    stockController.createStock);
app.get('/api/stock/:id',
    passport.authenticate('bearer', { session: false }),
    stockController.getStock);
app.delete('/api/stock/:id',
    passport.authenticate('bearer', { session: false }),
    stockController.deleteStock);
app.patch('/api/stock/:id',
    passport.authenticate('bearer', { session: false }),
    stockController.updateStock);

//Продукты
app.get('/api/product/find/',
    passport.authenticate('bearer', { session: false }),
    productController.findProducts);
app.get('/api/product/all',
    passport.authenticate('bearer', { session: false }),
    productController.getAllProducts);
app.get('/api/product/:id',
    passport.authenticate('bearer', { session: false }),
    productController.getProduct);
app.post('/api/product',
    passport.authenticate('bearer', { session: false }),
    productController.createProduct);
app.patch('/api/product/:id',
    passport.authenticate('bearer', { session: false }),
    productController.updateProduct);
app.delete('/api/product/:id',
    passport.authenticate('bearer', { session: false }),
    productController.deleteProduct);

export default app