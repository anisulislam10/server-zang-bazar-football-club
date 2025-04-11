import express from "express";
import {
    createMember,
    countMembers,
    getMemberById,
    updateMember,
    deleteMember,
    getMembers
} from "../controllers/member.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/post", upload.single("memberImage"), createMember);
router.get("/count", countMembers);

router.get("/get", getMembers);
router.get("/get/:id", getMemberById);
router.put("/update/:id", upload.single("memberImage"), updateMember);
router.delete("/delete/:id", deleteMember);


export default router;
