import express from 'express';
import { getUserByEmail,getUserById,getUsers } from "../db/users";


export const listAllUsersAPI = async(req:express.Request, res:express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    } catch(error) {
        return res.status(400).json(error);
    }
}