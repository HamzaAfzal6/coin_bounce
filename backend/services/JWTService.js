const jwt=require('jsonwebtoken');
const {REFRESH_TOKEN_SECRET,ACESS_TOKEN_SECRET}=require('../config/index');
const refrshToken=require('../models/token');
class JWTService {

static signAcessToken(payload,expiryTime,secret){

return jwt.sign(payload,ACESS_TOKEN_SECRET,{expiresIn:expiryTime})

}
static signRefreshToken(payload,expiryTime,secret){
    return jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn:expiryTime})
}

static verifyAcessToken(token){
    return jwt.verify(token,ACESS_TOKEN_SECRET);
}
static verifyRefreshToken(token){
    return jwt.verify(token,REFRESH_TOKEN_SECRET);
}

static async storeRefreshToken(token,userId){
    const newToken = new refrshToken({
        token: token,
        userId: userId
      });
      
      newToken.save()
        .then(() => {
          console.log('New token saved successfully');
        })
        .catch((error) => {
          console.log('Error while saving new token:', error);
        });
      
}


}

module.exports=JWTService;