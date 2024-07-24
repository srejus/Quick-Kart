import express from 'express';

import { addCart, getCart,CartItem } from '../db/cart';
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
        const data:CartItem[] = req.body;
        if(!req.body.quantity || !req.body.product) {
            return res.status(400).json({error:"'quantity' and 'product' are required"});
        }
        const sessionToken = req.cookies['APP-AUTH'];
        const user:any = await getUserBySessionToken(sessionToken);
        if(!user) {
            return res.status(400).json({error:"Invalid User"});
        }
        const cartItems = data.map(item => ({
            ...item,
            user:user
        }))
        const cart = addCart(cartItems);
        return res.status(201).json({message:"Cart objects created!"});
    } catch(error) {
        return res.status(400).json(error);
    }
}