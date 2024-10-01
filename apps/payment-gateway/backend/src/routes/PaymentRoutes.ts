import express from "express";
import  Jwt, { JwtPayload, TokenExpiredError }  from "jsonwebtoken"
import { Request, Response } from 'express';
import axios from "axios";
// import { createToken } from "../controllers/createToken";
const router = express.Router();
const secret="mysupersecret"

const createToken = (userId:string,amount:string) =>{
     const playload = {
          userId:userId,
          amount:amount,
     }
     const token =  Jwt.sign(playload,secret);

     return token;
}


router.post('/create',  (req: Request, res: Response) => {
    try {
        const data = req.body; 
        
        const Token = createToken(data.user_identifier,data.amount);


        console.log(Token, 'this is the data');

        res.json({token:Token, msg: "token created!!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

router.get('/check', async(req:Request,res:Response) => {
     const {token} = req?.query || "";
     

   try{
     if(typeof token === "string"){
          console.log(typeof token,'this is the type of token');

           const result = Jwt.verify(token,secret) as JwtPayload;
            
           const {userId,amount} = result;

           if(result){
               const body = {
                      token:token,
                      user_identifier: userId,
                      amount: amount
               }
              const responce =  await axios.post('http://localhost:3003/hdfcWebhook',body);
              

              if(responce.status === 411){
               res.status(401).json({msg:responce.data.message});
              }
              else if(responce.status === 201){
                console.log(responce.data,'this is responce');

              res.json({msg:"funds added sucessfully!!"});
              }
           }
            console.log(result,'this is result');
     }
   }catch(e){
         res.status(402).json({msg:e});
   }
      
})

export default router;