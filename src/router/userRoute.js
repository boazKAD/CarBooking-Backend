import express from "express";
import { userRegistration, getAllUser, getUserById, updateUserById } from "../controller/userController";


const router = express.Router();

router.post("/user", userRegistration);
router.get("/user", getAllUser);
router.get("/user/one/:id", getUserById);
router.get("/user/one/:id", updateUserById);

export default router;
