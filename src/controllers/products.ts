import express from 'express';

import { getProducts,getProductById,createProduct,updateProduct,deleteProduct } from "../db/products";


export const listProductsApi = async(req:express.Request, res:express.Response) => {
    try{
        const products = await getProducts();
        return res.status(200).json(products);
    } catch(error) {
        return res.status(400).json(error);
    }
}


export const getSingleProductApi = async(req:express.Request, res:express.Response) => {
    try{
        const {id} = req.params;
        const product = await getProductById(id);
        return res.status(200).json(product);
    } catch(error) {
        return res.status(400).json(error);
    }
}


export const createProductApi = async(req:express.Request, res:express.Response) => {
    try{
        const data = req.body;
        if(!data.product_name || !data.product_img || !data.price) {
            return res.status(400).json({error:"'product_name', 'product_img' and 'price' are required"});
        }

        const product = await createProduct(data);
        return res.status(201).json(product);
    } catch(error) {
        return res.status(400).json(error);
    }
}


export const updateProductApi = async(req:express.Request, res:express.Response) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const product = await updateProduct(id,data);
        return res.status(200).json({message:"Product updated successfully!"});
    } catch(error) {
        return res.status(400).json(error);
    }
}

export const deleteProductApi = async(req:express.Request, res:express.Response) => {
    try{
        const {id} = req.params;
        const product = await deleteProduct(id);
        return res.status(200).json({message:"product deleted successfully!"});
    } catch(error) {
        return res.status(400).json(error);
    }
}