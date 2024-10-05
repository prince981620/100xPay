import express from "express";
import userRouter from "./routes/PaymentRoutes";
import cors from"cors";


const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/',userRouter);

              

app.listen(PORT,()=>{
    console.log("server started at port: 8080");
})