const mongoose=require('mongoose');
const {MongoDb_Connection_String}=require('../config/index');



const dbconnect=async()=>{

await mongoose.connect(MongoDb_Connection_String,{useNewUrlParser:true})
.then((conn)=>console.log(`db connected to host :${conn.connection.host}`))
.catch((err)=>console.log('error is :'+JSON.stringify(err,undefined,2)));

};

module.exports=dbconnect;