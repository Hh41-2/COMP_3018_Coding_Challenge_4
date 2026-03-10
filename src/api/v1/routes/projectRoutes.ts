import express from "express";
import {
       getAllProject, 
       getProject, 
       createProject,
       healthCheck, 
       updateProject, 
       deleteProject
} from "../controllers/projectController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

// import authenticate from "../middleware/authenticate";
// import isAuthorized from "../middleware/authorize";


const router: express.Router = express.Router();

router.get("/health", healthCheck)

router.post(
       "/projects",
       authenticate,
       isAuthorized({ hasRole: ["admin", "lead"]}),
       createProject
);


router.get("/projects",
       authenticate,
       isAuthorized({ hasRole: ["admin", "lead", "developer"]}),
       getAllProject);

router.get("/projects/:id", getProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

export default router;