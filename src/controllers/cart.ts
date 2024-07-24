import express from 'express';

import { getCart,CartItem,getCartItemByProduct,createCart,updateCart,deleteCart } from '../db/cart';
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
        const sessionToken = req.cookies['APP-AUTH'];
        const user:any = await getUserBySessionToken(sessionToken);
        for(let item of data) {
            const quantity = item.quantity;
            console.log(quantity);
            const product = item.product;
            const existingObject:any = await getCartItemByProduct(product,user._id);
            console.log(existingObject.length === 0 && quantity !== 0);
            item['user'] = user._id;
            if(existingObject.length !== 0 && quantity !== 0) {
                console.log("Updated the Cart!");
                for(const obj of existingObject) {
                    const updatedCart = await updateCart(obj._id,item);
                }
            }
            else if(existingObject.length !== 0 && quantity === 0) {
                for(const obj of existingObject) {
                    console.log('deleting the object!');
                    const deletedCart = await deleteCart(obj._id);
                }
            }
            else if(existingObject.length === 0 && quantity !== 0) {
                console.log('Adding New Object!')
                const newCart = await createCart(item);
            }
        }
        // const existingObject = await getCartItemByProduct(req.body.product,user._id);
        // console.log(existingObject);
        // if(!user) {
        //     return res.status(400).json({error:"Invalid User"});
        // }
        // const cartItems = data.map(item => ({
        //     ...item,
        //     user:user
        // }))
        // const cart = addCart(cartItems);
        return res.status(201).json({message:"success"});
    } catch(error) {
        return res.status(400).json(error);
    }
}