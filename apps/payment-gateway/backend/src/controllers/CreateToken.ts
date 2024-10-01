import { Jwt } from "jsonwebtoken"
import { Request,Response } from "express";


const SECRET = "JHATU";

const  createToken = async(req:Request,res:Response) =>{

       const paymentInformation: {
              token: string;
              userId: string;
              amount: string;
            } = {
              token: req.body.token,
              userId: req.body.user_identifier,
              amount: req.body.amount,
            };


            console.log(paymentInformation);

       res.json({msg:"server is up and running!!"});

}

export {createToken};