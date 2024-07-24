import express from 'express';
import { listAllUsersAPI, updateUserApi } from '../controllers/users';
import { isAuthenticated } from '../middlewares';


export default(router:express.Router) => {
    router.get("/users",isAuthenticated,listAllUsersAPI);
    router.put("/users/:id",isAuthenticated,updateUserApi);
}