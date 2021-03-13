import { Router } from "express";
import { home, create, update, login } from "./controller";
import passport from 'passport';
import refreshToken from "../middleware/refreshToken"
const routes = Router();

routes.get("/", passport.authenticate('jwt', {session: false}), home);
routes.post("/login", login);
routes.post("/create", passport.authenticate('jwt', {session: false}), create);
routes.put("/update", passport.authenticate('jwt', {session: false}), update);

export default routes;
