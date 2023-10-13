import express from "express";
import { userRegistration } from "../controller/userController";


const router = express.Router();

router.post("/user", userRegistration)

export default router;
