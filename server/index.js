import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())


app.use('/users', userRoutes);



const CONNECTION_URL = 'mongodb+srv://knargocer:34142@cluster0.nykl0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology : true})
    .then(() =>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT} `)))
    .catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify',false);