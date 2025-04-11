import express from "express";
import {
    createPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    countPlayers
} from "../controllers/player.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/post", upload.single("playerImage"), createPlayer);
router.get("/count", countPlayers);

router.get("/get", getPlayers);
router.get("/:id", getPlayerById);
router.put("/update/:id", upload.single("playerImage"), updatePlayer);
router.delete("/delete/:id", deletePlayer);


export default router;
