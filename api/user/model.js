import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minimum: 6 },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()},
    rt: [{ type: Schema.Types.ObjectId, ref: "Rt" }],
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

export default model("User", userSchema);