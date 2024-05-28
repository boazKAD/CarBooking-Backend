import express from "express";
import { userRegistration, getAllUser, getUserById, updateUserById } from "../controller/userController";


const router = express.Router();

router.post("/", userRegistration);
router.get("/", getAllUser);
router.get("/one/:id", getUserById);
router.patch("/one/:id", updateUserById);

export default router;
