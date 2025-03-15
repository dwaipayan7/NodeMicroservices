import { config } from 'dotenv';
import express from 'express';
config();
import cors from 'cors';
import Routes from './router/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use(Routes);

app.get("/", (req, res) =>{
    res.send("Dwaipayan");
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    
});