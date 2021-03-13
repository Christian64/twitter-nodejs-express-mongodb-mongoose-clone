import {Schema, model} from "mongoose";

const schemaLike = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    tweet: {type: Schema.Types.ObjectId, ref: "Tweet"},
    comment: {type: Schema.Types.ObjectId, ref: "Comment"}
})

export default model("Like", schemaLike)