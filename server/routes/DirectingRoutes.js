import express from "express";
import checkAuth from "../utils/checkAuth.js";
import {
  addUserToApplications,
  createDirecting,
  getAdminsDirecting,
  getAllDirecting,
  getAllOrganizers,
  getDirecting,
  getDirectingAdmins,
  getStudentsDirecting,
  getUsersFromApplications,
  getUsersFromMembers,
  updateDirecting,
} from "../controllers/DirectingController.js";

const router = express.Router();

router.post("/create", checkAuth, createDirecting);
router.patch("/update/:id", checkAuth, updateDirecting);
router.get("/get-organizers", checkAuth, getAllOrganizers);
router.get("/get-all-directing", getAllDirecting);
router.get("/get-directing/:id", getDirecting);
router.get("/get-admins-directing/:id", checkAuth, getAdminsDirecting);
router.get("/get-students-directing/:id", checkAuth, getStudentsDirecting);
router.put("/add-to-applications/:id", checkAuth, addUserToApplications);
router.get("/get-applications/:id", checkAuth, getUsersFromApplications);
router.get("/get-members/:id", checkAuth, getUsersFromMembers);
router.get("/get-admins/:id", getDirectingAdmins);

export default router;
