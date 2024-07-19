import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url=process.env.URL;


try {
   mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
   if(mongoose.connection.readyState==1){
       console.log("Database connected successfully");
   };
} catch (error) {
    console.log(error.message);
    
}

