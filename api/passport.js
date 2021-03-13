import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import User from './user/model'
import jwt from "jsonwebtoken"

var opt = {}
opt.secretOrKey = process.env.JWT_Secret_Key;
opt.jwtFromRequest = ExtractJwt.fromHeader('x-access-token');

passport.use(new Strategy(opt, async (payload, done)=>{
    const user = await User.findById(payload.id);
    if(!user) return done(null, false)
    done(null, {_id: user._id, email: user.email, userName: user.userName})
}))