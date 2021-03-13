import dotenv from "dotenv";
dotenv.config();
/* ---------------------------------- */
import "./db";
/* ------------------ */
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import "./passport";
const app = express();

// SETTINGS
app.set("json space", 2);

/// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Lunch passport
passport.initialize();

// Routes
import userRoutes from "./user/routes";
app.use("/user", userRoutes);
import tweetRoutes from "./tweet/route";
app.use("/tweet", passport.authenticate('jwt', { session: false }), tweetRoutes);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => console.log(process.env.EXAMPLE));
