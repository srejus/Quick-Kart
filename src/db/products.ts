import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name:{type:String, requried:true},
    product_img:{type:String,required:true},
    price:{type:Number,requried:true}
});

export const ProductModel = mongoose.model("Product",productSchema);

export const getProducts = () => ProductModel.find();
export const getProductById = (id:string) => ProductModel.findById(id);
export const createProduct = (values:Record<string,any>) => new ProductModel(values)
    .save().then((product) => product.toObject());

export const updateProduct = (id:string,values:Record<string,any>) => ProductModel.findByIdAndUpdate(id,values);
export const deleteProduct = (id:string) => ProductModel.findByIdAndDelete(id);