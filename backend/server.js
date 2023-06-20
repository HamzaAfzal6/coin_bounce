const express=require('express');
const app=new express();
const dbconnect=require('./database/db');
const {PORT}=require('./config/index');
const errorHandler=require('./middleware/errorHandler');
const router=require('./routes/userRoutes');
const cookieParser=require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }));
  
app.use(cookieParser());
app.use(express.json()); //allowes app to communicate data in json
app.use(router);
dbconnect();
app.use('/storage',express.static('storage'));
app.use(errorHandler);
app.listen(PORT,console.log(`app is listening at port: ${PORT}`));