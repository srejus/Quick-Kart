import express from 'express';

import { addCart, getCart } from '../db/cart';
import { getUserBySessionToken } from '../db/users';

export const getUserCartApi = async(req:express.Request, res:express.Response) => {
    try{
        const sessionToken = req.cookies['APP-AUTH'];
        const user:any = await getUserBySessionToken(sessionToken);
        if(!user) {
            return res.status(400).json({error:"Invalid User"});
        }
        const cartItems = await getCart(user);
        return res.status(200).json(cartItems)
    } catch(error) {
        return res.status(400).json(error);
    }
}

export const addCartApi = async(req:express.Request, res:express.Response) => {
    try{
        const data = req.body;
        const cart = addCart(data);
        return res.status(201).json({message:"Cart objects created!"});
    } catch(error) {
        return res.status(400).json(error);
    }
}