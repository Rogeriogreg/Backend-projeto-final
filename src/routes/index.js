import { Router } from "express";

import UserController from "../controllers/UserController.js";
import ProductController from "../controllers/ProductController.js";
import CategoryController from "../controllers/CategoryController.js";
import ProductImageController from "../controllers/ProductImageController.js";
import ProductOptionController from "../controllers/ProductOptionController.js";
//import AuthController from "../controllers/AuthController.js";

//import jwt from 'jsonwebtoken';


const router = Router();

//          USERS

//Método GET
router.get('/v1/users', UserController.index);

//Pesquisando user por ID
router.get('/v1/users/:id', UserController.show);

//Método POST
router.post('/v1/users', UserController.store)

//Método PUT
router.put('/v1/users/:id', UserController.update);

//Método DELETE
router.delete('/v1/users/:id', UserController.delete);

//Authorization Token
// Rota para autenticar um usuário e gerar um token
//router.post('/v1/user/token', AuthController.generateToken);


//         PRODUCTS

//Método GET
router.get('/v1/products/search', ProductController.index);

//Pesquisando user por ID
router.get('/v1/products/:id', ProductController.show);

//Método POST
router.post('/v1/products', ProductController.store);

//Método PUT
router.put('/v1/products/:id', ProductController.update);

//Método DELETE
router.delete('/v1/products/:id', ProductController.delete);

//          CATEGORIES

//Método GET
router.get('/v1/category/search', CategoryController.index);

//Pesquisando user por ID
router.get('/v1/category/:id', CategoryController.show);

//Método POST
router.post('/v1/category', CategoryController.store);

//Método PUT
router.put('/v1/category/:id', CategoryController.update);

//Método DELETE
router.delete('/v1/category/:id', CategoryController.delete);

//          PRODUCTS IMAGES

//Método GET
router.get('/v1/productImage', ProductImageController.index);

//Pesquisando user por ID
router.get('/v1/productImage/:id', ProductImageController.show);

//Método POST
router.post('/v1/productImage', ProductImageController.store);

//Método PUT
router.put('/v1/productImage/:id', ProductImageController.update);

//Método DELETE
router.delete('/v1/productImage/:id', ProductImageController.delete);

//          PRODUCTS OPTIONS

//Método GET
router.get('/v1/productOptions', ProductOptionController.index);

//Pesquisando user por ID
router.get('/v1/productOptions/:id', ProductOptionController.show);

//Método POST
router.post('/v1/productOptions', ProductOptionController.store);

//Método PUT
router.put('/v1/productOptions/:id', ProductOptionController.update);

//Método DELETE
router.delete('/v1/productOptions/:id', ProductOptionController.delete);

export default router;