import express from "express";
import db from "@repo/db/client"
const app = express();

app.post("/hdfcWebhook", async (req,res)=>{
    // add zod validation here
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    // update balance in db, add txn
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount) 
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ])
        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        await db.onRampTransaction.updateMany({
            where: {
                token: paymentInformation.token
            },
            data: {
                status: "Failure",
            }
        })
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

