import Comment from "./model";
import Tweet from "../tweet/model";

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

        console.log(req.params)

        const tweet = await Tweet.findById(req.params.tweetId);
        console.log(tweet)
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
