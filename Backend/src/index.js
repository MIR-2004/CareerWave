import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import connectCloudinary from "./config/cloudinary.config.js";

const port = process.env.PORT || 3000;

connectDB().then(
    app.on("error", (error) => {
        console.log("Error:", error);
        throw error;
      })
      .listen(port, () => {
        console.log(`Server is running successfully on port ${port}`);
      })
    
).catch((err) => {
    console.log("Mongodb connection error", err)
})

await connectCloudinary()