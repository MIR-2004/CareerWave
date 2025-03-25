import express from 'express'
import cors from 'cors'



const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({extended: true, limit: '100kb'}))
app.use(express.static('public'))


// import routes



app.get('/', (req, res) => {
    res.send('Server is started successfully!!')
})


export {app}