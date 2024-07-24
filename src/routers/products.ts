import express from 'express';

import { listProductsApi,getSingleProductApi,createProductApi,deleteProductApi,updateProductApi } from '../controllers/products';
import { isAuthenticated } from '../middlewares';


export default(router:express.Router) => {
    router.get('/products',listProductsApi);
    router.get('/products/:id',getSingleProductApi);
    router.post('/products/create',isAuthenticated,createProductApi);
    router.put('/products/:id',isAuthenticated,updateProductApi);
    router.delete('/products/:id',isAuthenticated,deleteProductApi);
}