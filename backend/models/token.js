
const mongoose=require('mongoose');
const {Schema}=mongoose;

const refreshToken=new Schema({

    token:{type:String, require:true},
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:'users'}
},
{timeseries:true}
);
module.exports=mongoose.model('RefrshToken',refreshToken,'tokens');