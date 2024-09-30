"use server";

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnrampTransaction(provider:string,amount:number) {
    console.log(amount);
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id){
        return {
            message: "Unauthenticated Request"
        }
    }
    const token = (Math.random()*1000).toString();
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
    return {
        message: "Done"
    }
}