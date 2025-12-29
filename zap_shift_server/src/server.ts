import mongoose from "mongoose";
import app from "./app";
import { config } from "./config";

const main = async() =>{
    try{
        await mongoose.connect(`${config.dbUrl}`);
        console.log("Database connected successfully");
    }catch(error){
        console.log("Database connection failed", error);
    }
}

main();


app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
