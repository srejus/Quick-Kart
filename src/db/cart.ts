import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",requried:true},
    quantity:{type:Number,required:true}
})

export const CartModel = mongoose.model("Cart",cartSchema);

export const getCart = (userId:string) => CartModel.find({user:userId});
export const addCart = (values:Record<string,any>) => CartModel.insertMany(values);


export interface CartItem {
    product:string,
    quantity:number,
    user:string
}
