const JWTService = require("../services/JWTService");
const User=require('../models/user');

 const auth=async (req,res,next)=>{

const {refreshToken,acessToken}=req.cookies;
//if no token
if(!refreshToken || !acessToken){
const error={
    status:401,
    message:'unauthorised'
}
return next(error);
}
let _id;
try{
    _id =await JWTService.verifyAcessToken(acessToken)._id; 
}
catch(error){
    return next(error);
}
let user;
try{
  user =await User.findOne({_id : _id})
}
catch(error){
    return next(error);
}
req.user = {
    username: user.username,
    email: user.email,
    _id: user._id
  };
  
next();


}
module.exports =auth;