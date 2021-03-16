import Tweet from "./model";
import User from "../user/model";
import Rt from "../rt/model";
import Like from "../like/model";

export const create = async (req, res) => {
    try {
        const { _id } = req.user;
        req.body.author = _id;
        const tweet = await new Tweet(req.body);
        await tweet.save();
        const user = await User.findOne({ _id });
        user.tweets.push(tweet._id);
        await user.save();
        res.status(200).json({ user });
    } catch (err) {
        console.log("This is the Error:", err);
    }
};

export const tweets = async (req, res) => {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
};

export const tweetId = async (req, res) => {
    const tweet = await Tweet.findById(req.params.id).populate("author");
    res.status(200).json(tweet);
};

export const tweetDelete = async (req, res) => {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    res.send("tweet Deleted!");
};

export const deleteAll = async (req, res) => {
    await Tweet.deleteMany();
    const user = await User.findOne({ _id: req.user._id });
    user.tweets = [];
    await user.save();
    res.status(200).json(req.user);
};

export const createRt = async (req, res) => {

    const { id } = req.params;
    req.body.tweet = id;
    req.body.author = req.user._id;
    const rt = new Rt(req.body);
    await rt.save();

    const tweet = await Tweet.findById(id);
    tweet.shares.push(rt._id);
    await tweet.save();

    res.send(rt);
};

export const removeRt = async (req, res) => {
    const { id, rtId } = req.params;
    await Rt.findByIdAndDelete(rtId);
    const tweet = await Tweet.findById(id).populate("shares");
    tweet.shares.pull(rtId);
    await tweet.save();
    res.send(tweet);
};


export const createLike = async (req, res) => {
    const { id } = req.params;
    req.body.author = req.user._id;
    req.body.tweet = id;
    try{
        const like = new Like(req.body);
        await like.save();
        const tweet = await Tweet.findById(id);
        tweet.likes.push(like._id);
        await tweet.save();
        res.status(200).json(tweet);
    }
    catch (err){
        console.log("This is the error:", err);
    }
}

export const deleteLike = async (req, res) => {
    const { id, likeId } = req.params;
    try{
        await Like.findByIdAndDelete(likeId);
        const tweet = await Tweet.findById(id).populate("likes");
        tweet.likes.pull(likeId);
        await tweet.save();
        res.status(200).json(tweet);
    }
    catch (err){
        console.log("This is the error",err);
    }

}