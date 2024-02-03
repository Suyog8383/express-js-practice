import express from "express";
import userRouter from "./routes/users.mjs";
import productRouter from "./routes/products.mjs";
import { loggingMiddleware } from "./utils/middlewares.mjs";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
