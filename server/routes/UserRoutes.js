import express from "express";
import {
  getUser,
  getUserData,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/UserControllers.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get", checkAuth, getUser);
router.get("/get-user/:id", getUserData);
router.patch("/update", checkAuth, updateUser);

export default router;
