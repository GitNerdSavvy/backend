const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app=express();
const port=process.env.PORT || 4000;
 
app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URL;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true}
    );

const connection=mongoose.connection;
connection.once('open', ()=>{
    console.log('connected to MongoDB Atlas.');
})

const exercisesRouter = require('./routes/exercise');
const usersRouter = require('./routes/user');

app.use('/exercise', exercisesRouter);
app.use('/user', usersRouter);



app.listen(port, ()=>{
    console.log(`Server is running on PORT: ${port}`)
})