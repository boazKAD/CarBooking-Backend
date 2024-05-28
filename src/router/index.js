import express from "express";
import CarRoutes from "./carRouter/carRoutes";
import userRoutes from "./userRoute";
const app = express();

app.use("/car", CarRoutes);
app.use("/user",userRoutes)
export default app;