import { Router } from "express";
import {
    create,
    remove,
    show,
    createRt,
    removeRt,
    createLike,
    removeLike,
} from "./controller";
const routes = Router();

routes.post("/:tweetId/comment/create", create);
routes.route("/:tweetId/comment/:id").get(show).delete(remove);
routes.post("/:tweetId/comment/:id/rt", createRt);
routes.delete("/:tweetId/comment/:id/rt/:rtId", removeRt);
routes.post("/:tweetId/comment/:id/like", createLike);
routes.delete("/:tweetId/comment/:id/like/:likeId", removeLike);

export default routes;
