
import dotenv from "dotenv";
import connectDB from "../db/db.js";
import { app } from "./app.js";

dotenv.config();
//const app = express();

connectDB()


.then(() =>{
    app.listen(process.env.PORT || 5000, () =>{
        console.log(`server is running at port: ${process.env.PORT}`);
    
    })
    app.get("/", (req, res) => {
      res.send("🚀 Backend connected and running!");
    });
})
.catch((err) =>{
    console.log("mongodb connection failed !!!", err);
})