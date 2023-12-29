import mongoose from "mongoose";

export const connectDB = ()=>{
    const db = process.env.DB_URI;
    mongoose.connect(db)
        .then(()=>{
            console.log(`Connect to ${db}`)
        })
        .catch((err)=>{
            console.log(`Error connecting to DB: ${err}`)
        });
};