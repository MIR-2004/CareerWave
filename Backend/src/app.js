import "./config/instrument.js";
import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from './routes/company.routes.js'
import jobRoutes from './routes/job.routes.js'



const app = express()

Sentry.setupExpressErrorHandler(app);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


// import routes

app.get('/', (req, res) => {
    res.send('Server is Running successfully!!')
})

app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)


export {app}