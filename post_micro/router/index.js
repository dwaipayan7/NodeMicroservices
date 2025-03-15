import { Router } from "express";
import PostRoutes from "./post.routes.js";

const router = Router();


router.use("/api", PostRoutes);

export default router;