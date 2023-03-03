import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUser } from '../services/userServices';
const SECRET_KEY = "NOTESAPI";
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
        return res.json({"status":401,"message":"user not authorized"})

        }
        interface JwtPayload {
            id: string
          }
        const decodedToken = jwt.verify(token,SECRET_KEY) as JwtPayload;
        const id= decodedToken.id;
        const user = await findUser({"id":id});
        if (!user) {
          return res.json({"status":401,"message":"user not authorized"})
        }
        next()
      
      } catch(err) {
       return res.json({"status":500,message:"Something went wrong!"})
      }
}


export default auth;