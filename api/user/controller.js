import User from "./model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Wrong Email");
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) return res.status(401).send("Wrong Password");
    const token = jwt.sign({id: user.id}, process.env.JWT_Secret_Key, {
        expiresIn: "3d"
    });
    res.send(token);
};

export const home = async (req, res) => {
    const user = await User.findById(req.user._id).populate('tweets');
    res.status(200).json(user);
};

export const update = async (req, res) => {
    req.body.updated_at = Date.now();
    req.body.password = await bcrypt.hash(req.user.password, 10);
    const user = await User.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json(user);
};

export const create = async (req, res) => {
    console.log(req.body);
    try {
        req.body.password = await bcrypt.hash(req.user.password, 10);
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({id: user.id}, process.env.JWT_Secret_Key, {expiresIn: "3d"})
        res.status(200).json(token);
    } catch (e) {
        console.log(("error:", e));
    }
};
