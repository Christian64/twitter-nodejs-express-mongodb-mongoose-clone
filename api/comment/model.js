import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    body: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "Rt" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Comment", commentSchema);
