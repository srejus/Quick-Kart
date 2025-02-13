import express from 'express';

import { getUserByEmail,createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async(req:express.Request, res:express.Response) => {
    try{
        const {email,password,username} = req.body;
        if(!username || !password || !email) {
            return res.status(400).json({error:"'username', 'password', 'email' are requried "});
        }
        
        const existingUser = await getUserByEmail(email);
        if(existingUser) {
            return res.status(400).json({error:"User with this email already exist!"});
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication:{
                salt,
                password: authentication(salt,password),
            },
        })
        return res.status(200).json(user);
    } catch(error) {
        return res.status(400).json(error);
    }
}


export const login = async(req:express.Request, res: express.Response) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({error:"'email' and 'password' are required"});
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) {
            return res.status(400).json({error:"Invalid email!"});
        }
        const expectedHsh = authentication(user.authentication.salt,password);
        console.log(expectedHsh);
        console.log(user);
        if(user.authentication.password !== expectedHsh) {
            return res.status(403).json("Invalid user!");
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt,user._id.toString());
        
        await user.save();
        res.cookie('APP-AUTH', user.authentication.sessionToken, {domain:'localhost',path:'/'});
        return res.status(200).json({user}).end();
    } catch(error) {
        return res.status(400).json(error);
    }
}