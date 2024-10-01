import express from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const secret = process.env.JWT_SECRET  || "mysupersecret";

const createToken = (userId: string, amount: string, number:string) => {
  const playload = {
    number: number,
    userId: userId,
    amount: amount,
  };
  const token = Jwt.sign(playload, secret);

  return token;
};

const verifyToken = (token: string)=>{
  const result = Jwt.verify(token,secret) as JwtPayload;
  return result;
}

router.post("/create", (req: Request, res: Response) => {
  try {
    const data = req.body;
    const Token = createToken(data.user_identifier, data.amount,data.number);
    res.json({ token: Token, msg: "token created!!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/verify",(req:Request,res:Response)=>{
  try{
    if(typeof req.query.token === "string"){
      const {userId,amount,number} = verifyToken(req.query.token);
      res.status(200).json({
        number,
        userId,
        amount
      })
    }else{
      res.status(404).json({
        message: "Invalid Token"
      })
    } 
  }catch(e){
    res.status(411).json({
      message: "Error while verifying token",
      error:e
    })
  }
})

router.get("/finalize", async (req: Request, res: Response) => {
  console.log("this is the call to finize")
  try {
    if (typeof req.query.token === "string") {
      console.log("this is the call to finize and token is",req.query.token);


      const { userId, amount } = verifyToken(req.query.token);

      if (userId && amount) {
        const body = {
          token: req.query.token,
          user_identifier: userId,
          amount: amount,
        };
        const responce = await axios.post(
          "http://localhost:3003/hdfcWebhook",
          body
        );

        if (responce.status === 411) {
          res.status(401).json({ msg: responce.data.message });
        } else if (responce.status === 201) {
          console.log(responce.data, "this is responce");

          res.json({ msg: "funds added sucessfully!!" });
        }
      }
      console.log(userId,amount, "this is result and userId");
    }
  } catch (e) {
    res.status(402).json({ msg: e });
  }
});

export default router;
