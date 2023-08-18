import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.js'
import seedRouter from "./routes/seedRoutes.js"
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config()
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message)
  })

const port = process.env.PORT
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.get("/hi",(req,res)=>{
  res.send("Hi")
})
app.use("/api/products", productRouter)
app.use("/api/seed", seedRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })




