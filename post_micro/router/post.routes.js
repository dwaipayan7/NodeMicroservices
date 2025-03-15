import { Router } from "express";
import PostController from "../controller/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = Router();


router.post("/post", authMiddleware, PostController.store);
router.get("/post", PostController.index);


export default router;