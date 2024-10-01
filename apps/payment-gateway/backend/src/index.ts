import express from "express";
import userRouter from "./routes/PaymentRoutes";

const PORT = 8080;
const app = express();


app.use(express.json());
app.use('/',userRouter);



app.listen(PORT,()=>{
    console.log("server started at port: 8080");
})