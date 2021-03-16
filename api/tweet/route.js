import { Router } from "express";
import {
    create,
    tweets,
    tweetId,
    deleteAll,
    tweetDelete,
    createRt,
    removeRt,
    createLike,
    deleteLike
} from "./controller";
const routes = Router();

routes.get("/", tweets);
routes.get("/deleteAll", deleteAll);
routes.route("/:id").get(tweetId).delete(tweetDelete);
routes.post("/create", create);
routes.post("/:id/rt", createRt);
routes.delete("/:id/rt/:rtId", removeRt);
routes.post("/:id/like", createLike);
routes.delete("/:id/like/:likeId", deleteLike);

export default routes;
