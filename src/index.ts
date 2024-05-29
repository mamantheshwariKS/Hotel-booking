import express from 'express'
import cors from 'cors'
import { Http2SecureServer } from 'http2'

import { connectMongoDB } from './wrapper/MongoHelper'

import authRouter from './routers/AuthRouters'
import hotelRouter from './routers/HotelRourters'

//import {authRouter} from './routers/UserRouters'

const tag = 'index.ts'

export var server: Http2SecureServer = require('http').createServer()
const app = express()
const PORT = 3000
export function rootDir(): string { return __dirname }

server.on('request', app)

const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => { express.json()(req, res, next) })

app.get('/', (req, res, next) => { console.log('Welcome to Backend') })

connectMongoDB()

app.use('/auth', authRouter);
app.use('/hotel', hotelRouter);


server.listen(PORT, () => {
    return console.log(tag, '🚀 🚀 🚀 🚀 🚀 🚀  Backend is running @' + PORT + ' port.')
})