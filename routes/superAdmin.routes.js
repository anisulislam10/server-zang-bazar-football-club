import express from "express";
import { 
    registerSuperAdmin, 
    loginSuperAdmin, 
    getSuperAdmin, 
    updateSuperAdmin, 
    deleteSuperAdmin 
} from "../controllers/superAdmin.controller.js";

const router = express.Router();

router.post("/register", registerSuperAdmin); 
router.post("/login", loginSuperAdmin); 
router.get("/get/:id", getSuperAdmin); 
router.put("/:id", updateSuperAdmin); 
router.delete("/:id", deleteSuperAdmin); 

export default router;
