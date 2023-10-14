import express from "express";
import { userRegistration, getAllUser } from "../controller/userController";


const router = express.Router();

router.post("/user", userRegistration);
router.get("/user", getAllUser);

export default router;
