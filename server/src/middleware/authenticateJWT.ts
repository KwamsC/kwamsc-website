import { NextFunction, Request, Response } from "express";
import { app } from '../config/firebase-config'

export const authenticateJWT = async (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
 
  if (authHeader) {
    const idToken = authHeader.split(" ")[1];
    // console.log(authHeader)

    app
      .auth()
      .verifyIdToken(idToken)
      .then(()=>{
        return next();
      })
      .catch((error)=> {
        console.log('Catch '+ error);
        return res.sendStatus(403);
      });
  } else {
    res.sendStatus(401);
  }
};
