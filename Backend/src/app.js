import "./config/instrument.js";
import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js";



const app = express()

Sentry.setupExpressErrorHandler(app);

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

app.post('/webhook', clerkWebhooks)


export {app}