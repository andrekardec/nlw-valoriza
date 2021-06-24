import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

// Because handle already receives request and response
router.post("/users", createUserController.handle);


export { router }