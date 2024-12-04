import { Router } from "express";
import { getUsers, addUser } from "../controllers/authController";

const router = Router();

router.get("/users", getUsers);
router.post("/register", addUser);

export default router;