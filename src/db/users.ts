import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type: String, required:true},
    email: {type: String, requried: true},
    authentication: {
        password:{type: String,required: true,select:false},
        salt:{type: String,select:false},
        sessionToken: {type: String,select: false},
    },
});

export const UserModel = mongoose.model("User",userSchema);

export const getUsers = () => UserModel.find();
export const getUserById = (id:string) => UserModel.findById(id);
export const getUserByEmail = (email:string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken:string) => UserModel.findOne({
    'authentication.sessionToken':sessionToken,
});

export const createUser = (values:Record<string,any>) => new UserModel(values)
    .save().then((user) => user.toObject());