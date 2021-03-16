import Comment from "./model";
import Tweet from "../tweet/model";
import Rt from "../rt/model";
import Like from "../like/model";

export const show = async () => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id)
            .populate("tweet")
            .populate("author");
        res.status(200).json(comment);
    } catch (err) {
        console.log("This is the error:", err);
    }
};

export const create = async (req, res) => {
    try {
        req.body.tweet = req.params.tweetId;
        req.body.author = req.user._id;
        const comment = new Comment(req.body);
        await comment.save();

        console.log(req.params);

        const tweet = await Tweet.findById(req.params.tweetId);
        console.log(tweet);
        tweet.comments.push(comment._id);
        await tweet.save();

        res.status(200).json(comment);
    } catch (err) {
        console.log("This is the ERROR:", err);
    }
};

export const remove = async (req, res) => {
    try {
        const { id, tweetId } = req.params;
        await Comment.findByIdAndDelete();
        const tweet = await Tweet.findById(tweetId).populate("comments");
        tweet.comments.pull(id);
        await tweet.save();
        res.status(200).json(tweet);
    } catch (err) {
        console.log("This is the error:", err);
    }
};

export const createRt = async (req, res) => {
    const { id } = req.params;
    req.body.author = req.user._id;
    req.body.comment = id;
    const rt = new Rt(req.body);
    await rt.save();
    const comment = await Comment.findById(id).populate("shares");
    comment.shares.push(rt._id);
    comment.save();
    res.status(200).json(comment);
};

export const removeRt = async (req, res) => {
    try {
        const { id, rtId } = req.params;
        await Rt.findByIdAndDelete(rtId);
        const comment = await Comment.findById(id);
        comment.shares.pull(id);
        await comment.save();
        res.status(200).json(comment);
    } catch (err) {
        console.log("This is the Error:", err);
    }
};

export const createLike = async (req, res) => {
    const { id } = req.params;
    req.body.comment = id;
    req.body.author = req.user._id;
    try {
        const like = new Like(req.body);
        await like.save();
        const comment = await Comment.findById(id);
        comment.likes.push(like);
        await comment.save();
        res.send(comment);
    } catch (err) {
        console.log("This is the error:", err);
    }
};

export const removeLike = async (req, res) => {
    const { id, likeId } = req.params;
    try {
        await Like.findByIdAndDelete(likeId);
        const comment = await Comment.findById(id).populate("likes");
        comment.likes.pull(likeId);
        await comment.save();
        res.status(200).json(comment);
    } catch (err) {
        console.log("This is the error:", err);
    }
};
