import { Router } from "express";
import { create, remove, show } from "./controller";
const routes = Router();

routes.post("/:tweetId/comment/create", create);
routes.route("/:tweetId/comment/:id")
    .get(show)
    .delete(remove)

export default routes;
