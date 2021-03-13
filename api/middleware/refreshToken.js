/* import jwt from "jsonwebtoken";

const refreshToken = async (req, res, next)=>{
    try{
        await jwt.verify(req.header("x-access-token"), process.env.JWT_Secret_Key)
    }
    catch(err){
        if(err.name === "TokenExpiredError") console.log('Ha expirado!')
    }
    next()
}

export default refreshToken; */