import { config } from 'dotenv';
import express from 'express';
config();
import cors from 'cors';
import Routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use(Routes);

app.get("/", (req, res) =>{
    res.send("Dwaipayan");
});


app.listen(3000, () =>{
    console.log("Server is running on port 3000");
    
});