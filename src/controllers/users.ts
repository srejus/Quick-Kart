import express from 'express';
import { getUserByEmail,getUserById,getUsers,updateUser } from "../db/users";


export const listAllUsersAPI = async(req:express.Request, res:express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    } catch(error) {
        return res.status(400).json(error);
    }
}

// get sessionToken to update current user without accepting id
export const updateUserApi = async(req:express.Request,res:express.Response) =>{
    try{
        const {id} = req.params;
        const data = req.body;
        const user = await updateUser(id,data);
        return res.status(200).json({message:"User Updated!"});
    } catch(error) {
        return res.status(400).json(error);
    }
}