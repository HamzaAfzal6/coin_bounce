const mongoose=require('mongoose');

const {Schema}=mongoose;

const photoSchema=new Schema({

  
photopath:{type:String,required:true},

},
{timestamps:true}

);

module.exports=mongoose.model('Photo',photoSchema,'photoss');
