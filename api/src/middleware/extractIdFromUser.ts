import { Request, Response } from "express";

import jwt from 'jsonwebtoken' ;

export  interface RequestAuthID extends Request {
    user?:{
    
       
        id:number ;
    }
}

export default  function extractIdFromUser( id:number):any
{
    return id ;
}