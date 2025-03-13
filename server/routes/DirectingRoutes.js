import express from "express";
import checkAuth from "../utils/checkAuth.js";
import {
  createDirecting,
  getAdminsDirecting,
  getAllDirecting,
  getAllOrganizers,
  getDirecting,
  updateDirecting,
} from "../controllers/DirectingController.js";

const router = express.Router();

router.post("/create", checkAuth, createDirecting);
router.patch("/update/:id", checkAuth, updateDirecting);
router.get("/get-organizers", checkAuth, getAllOrganizers);
router.get("/get-all-directing", getAllDirecting);
router.get("/get-directing/:id", getDirecting);
router.get("/get-admins-directing", checkAuth, getAdminsDirecting);

export default router;
