import { Schema, model } from "mongoose";

const tweetSchema = new Schema({
    tweet: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "Rt" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

export default model("Tweet", tweetSchema);
