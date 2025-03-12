import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/UserControllers.js";
import checkAuth from '../utils/checkAuth.js'

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get", checkAuth, getUser);

export default router;
