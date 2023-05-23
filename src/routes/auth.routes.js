import { Router } from "express";
import { signUp } from "../controllers/auth.controllers.js";
import { signUpSchema } from "../schemas/auth.schemas.js";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);

export default authRouter;
