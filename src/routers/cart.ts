import express from 'express';
import { getUserCartApi,addCartApi } from '../controllers/cart';


export default(router:express.Router) => {
    router.get('/cart',getUserCartApi);
    router.post('/cart/create',addCartApi);
}