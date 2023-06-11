import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog.js';
import router from './routes/user.js';

const app = express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

/*connect to mongodb*/
mongoose.connect('mongodb+srv://VenessaChebukwa:Romulemia01@cluster0.g7eigh4.mongodb.net/Blog?retryWrites=true&w=majority').then(()=>app.listen(5000)).then(()=>console.log('Connected to database and listening to localhost port 5000')).catch((err)=>console.log(err));


// /*define port number*/
// app.listen(5000);