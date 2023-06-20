const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const JWTService=require('../services/JWTService');
const RefreshToken=require('../models/token');
const token = require('../models/token');
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const userController = {
   async  reg(req, res, next) {
    // validate userdata
    const userSchema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      name: Joi.string().max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmpassword: Joi.ref('password')
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // check email and username already exist
    const { username, name, email, password } = req.body;
    try {
      const checkEmail = await User.exists({ email });
      const checkUsername = await User.exists({ username });
      if (checkEmail) {
       const error = {
          status: 409,
          message: 'Email already registered'
        } 
        return next(error);
      }
      if (checkUsername) {
      const  error = {
          status: 409,
          message: 'Username already registered'
        } 
        return next(error);
      }
      
    } 
    catch (error) {
      return next(error);
    }
 let user;
 let acessToken;
 let refreshToken;
   try{ // hash password and register user
    const hashPassword = await bcrypt.hash(password, 10);
    const userToReg = new User({
      name,
      username,
      email,
      password:hashPassword
    });
     user = await userToReg.save();
     acessToken=JWTService.signAcessToken({id:user._id},'30m');
    refreshToken=JWTService.signRefreshToken({id:user._id},'60m');
  }
   catch(error){return next(error);}

  await JWTService.storeRefreshToken(refreshToken,user._id) //store rtoken in db
  //send cookie
  res.cookie('acessToken',acessToken,{
    maxAge: 1000*60*60*20,
    httpOnly : true
  })
  res.cookie('refreshToken',refreshToken,{
    maxAge:1000*60*60*24,
    httpOnly:true
  })
return res.status(201).json({ name, username, email ,auth:true});
  },

 
 
  async  login(req, res, next) {
   // validate userdata
 const userSchema=Joi.object({

   username:Joi.string().required(),
   password:Joi.string().required()
});
const {error}= userSchema.validate(req.body);
if(error){
  return next(error); 
}
let user;
try{
   const { username,  password } = req.body;
    user = await User.findOne({ username });
    
    if(!user){
       const error={
          status:401,
          message:"username not match"
         }
         return next(error);
      }
      
      const checkPassword = await bcrypt.compare(password, user.password);
if(!checkPassword){
   const error={
      status:401,
      message:"password not match"
   }
   return next(error);
   }


}
catch(error){
   return next(error);
}

const acessToken=JWTService.signAcessToken({_id:user._id},'30m');
const refreshToken=JWTService.signRefreshToken({_id:user.id},'60m');
try{
  await RefreshToken.updateOne({_id:user._id},{token:refreshToken},{upsert:true})
}
catch(error){return next(error)}

res.cookie('acessToken',acessToken,{
  maxAge: 1000*60*60*20,
  httpOnly : true
})
res.cookie('refreshToken',refreshToken,{
  maxAge:1000*60*60*24,
  httpOnly:true
})
const { _id,username, name, email } = user;
return res.status(200).json({ _id,username, name, email,auth:true });


  },


  async logout(req, res, next) {
    const { refreshToken } = req.cookies;
    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    
    } catch (error) {
      return next(error);
    }
    res.clearCookie('acessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ user: null, auth: false });
  },  



async refesh(req,res,next){
//get refresh token from cookies
//verify refesh token
//generate new tokens
//send res , update db
const orignalRefreshToken=req.cookies.refreshToken;
let id;
try{
  id=JWTService.verifyRefreshToken(orignalRefreshToken)._id;
}
catch(e){
const error={
  status:401,
  message:'unauthorize'
}
return next(error);
}
try{
const match=RefreshToken.findOne({_id:id,token:orignalRefreshToken})
if(!match){
const error={
  status:401,
  message:'unauthorized'
}
return next(error);

}
}
catch(error){
  return next(error);
}
try{
  const acessToken=JWTService.signAcessToken({_id:id},'30m');
  const refreshToken=JWTService.signRefreshToken({_id:id},'60m');
  //model update
  RefreshToken.updateOne({_id:id},{token:refreshToken});

  res.cookie('acessToken',acessToken,{
    maxAge:1000*60*60*24,
    httpOnly:true
  });
  res.cookie('refreshToken',refreshToken,{
    maxAge:1000*60*60*24,
    httpOnly:true
  });

}
catch(error){
  return next(error);
}
const user=await User.findOne({_id:id});
res.status(200).json({
  username: user.username,
  name: user.name,
  email: user.email
  ,auth:true});





},


  async allUsers (req, res, next) {
    // get all users
    User.find()
    .then(docs => res.send(docs))
    .catch(err => console.log('error occurs' + JSON.stringify(err, undefined, 2)));
  }
};

module.exports = userController;
