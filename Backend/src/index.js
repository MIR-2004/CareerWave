import 'dotenv/config'
import { app } from './app.js'



const port = process.env.PORT || 3000

app.on("error", (error)  => {
    console.log("Error:", error)
    throw error;
}).listen(port, () => {
    console.log(`Server is running successfully on port ${port}`)
})