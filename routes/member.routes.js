import express from "express";
import {
    createMember,
    countMembers,
    getMemberBySlug,
    updateMember,
    deleteMember,
    getMembers
} from "../controllers/member.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/post", upload.single("memberImage"), createMember);
router.get("/count", countMembers);

router.get("/get", getMembers);
router.get("/get/:slug", getMemberBySlug);
router.put("/update/:slug", upload.single("memberImage"), updateMember);
router.delete("/delete/:slug", deleteMember);


export default router;


