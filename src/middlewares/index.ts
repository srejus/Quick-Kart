import express from 'express';
import {identity, merge} from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async(req:express.Request, res:express.Response, next:express.NextFunction) => {
    try {
        const sessionToken = req.cookies['APP-AUTH'];

        if(!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});
        return next();
    } catch(error) {
        return res.sendStatus(403);
    }
}