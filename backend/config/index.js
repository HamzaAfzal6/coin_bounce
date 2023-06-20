const dotenv=require('dotenv').config();

const PORT=process.env.PORT;
const MongoDb_Connection_String=process.env.MONGODB_CONNECTION_STRING;
const ACESS_TOKEN_SECRET=process.env.ACESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;
const BACKEND_SERVER_PATH=process.env.BACKEND_SERVER_PATH;
const API_KEY=process.env.API_KEY;

module.exports={
PORT, MongoDb_Connection_String, ACESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET,BACKEND_SERVER_PATH, API_KEY
};

