const jwt = require("jsonwebtoken");
require("dotenv").config()

const AuthenticationMiddleware =  async(req,res, next)=>{
    const token =  req.headers.authorization.split(" ")[1];
    try {
        const decodeToken = jwt.verify(token,process.env.SECRET);
        req.body.userId = decodeToken.userId;
        next();
    } catch (error) {
        return res.status(401).send({message:"Authentication failed", Error:error.message, result:false})
    }
}


module.exports = {AuthenticationMiddleware}
