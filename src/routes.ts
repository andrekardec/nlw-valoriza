import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListUserSentComplimentsController } from "./controllers/ListUserSentComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserController } from "./controllers/ListUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listTagsController = new ListTagsController();
const listUserController = new ListUserController();

// (ensureAdmin) Because handle already receives request and response (middleware)
router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, ensureAdmin, listUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.post("/auth/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);
router.get("/users/compliments/sent", ensureAuthenticated, listUserSentComplimentsController.handle);
router.get("/users/compliments/received", ensureAuthenticated, listUserReceivedComplimentsController.handle);





export { router }