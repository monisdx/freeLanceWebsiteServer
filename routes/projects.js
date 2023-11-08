import express from "express";
import {
  PostProject,
  all_projects_of_freelancer,
  all_projects_of_freelancerbyid,
  deleteProject
} from "../controllers/Projects.js";
import { fetchuser } from "../middleware/fetchuser.js";
const router = express.Router();

router.post("/post_project", fetchuser, PostProject);
router.get("/all_projects", fetchuser, all_projects_of_freelancer);
router.get("/all_projects/:id", all_projects_of_freelancerbyid);
router.delete("/deleteproject/:id" , deleteProject)

export default router;