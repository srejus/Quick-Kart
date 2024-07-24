import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",requried:true},
    quantity:{type:Number,required:true}
})

export const CartModel = mongoose.model("Cart",cartSchema);

export const getCart = (userId:string) => CartModel.find({user:userId});
export const addCart = (values:Record<string,any>) => CartModel.insertMany(values);
export const createCart = (values: Record<string,any>) => new CartModel(values)
    .save().then((cart) => cart.toObject());

export const updateCart = (id:string,values: Record<string,any>) => CartModel.findByIdAndUpdate(id,values);
export const deleteCart = (id:string) => CartModel.findByIdAndDelete(id);
export const getCartItemByProduct = (product:string,user:string) => CartModel.find({product,user});

export interface CartItem {
    product:string,
    quantity:number,
    user:string
}
