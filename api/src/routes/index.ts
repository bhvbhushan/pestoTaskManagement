import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import profileRoutes from "./profile.route";
import { authenticate } from "@/middlewares";

const router = Router();
router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/profile", authenticate, profileRoutes);

export default router;
