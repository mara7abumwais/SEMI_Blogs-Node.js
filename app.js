import {createApp} from './stratup/routes.js';
import { connectDB } from './stratup/db.js';
import {validation} from './stratup/validation.js';
import dotenv from 'dotenv';
dotenv.config();

const app = createApp();
validation();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`connect to port ${PORT}...`);
});

