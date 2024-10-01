"use server";
import axios from "axios"
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { NextResponse } from "next/server";





export async function createOnrampTransaction(provider:string,amount:number) {
try{
    console.log(amount);
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id){
        return {
            message: "Unauthenticated Request"
        }
    }

         let token = null;

         const body = {
              amount,
              user_identifier: session?.user?.id
          }

          console.log('calling for token...')

          const res = await axios.post('http://localhost:8080/create',body);
  
            if(res.data.token){
                token = res.data.token;
            }
     
            console.log('server responce is done..',token);
        if(token){
    await db.onRampTransaction.create({
        data:{
            status: "Processing",
            token,
            provider,
            amount,
            startTime: new Date(),
            userId: Number(session?.user?.id)
        }
    });
        }


    NextResponse.json({msg:"sucess"},{status:200});
}
catch(e){
     NextResponse.json({error:e},{status:401})
}
}