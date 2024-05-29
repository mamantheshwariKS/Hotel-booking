import { Collection, MongoClient } from 'mongodb'
import { HotelsBean, UserBean , RoomBean } from '../schema/schemaBeans'
import { Env } from '../environment/Env'
import commons from './Commons'


const tag = 'MongoHelper.ts'

var mongoClient: MongoClient | undefined

export async function connectMongoDB() {
    try {
        let mongoDBUrl = Env.mongoDBUrl
        console.log(connectMongoDB.name + ' of ' + tag, '🥨 🥨 🥨 🥨 🥨 🥨  Mongodb creating new connection...')
        mongoClient = new MongoClient(mongoDBUrl)
        await mongoClient.connect()

        await mongoClient.db().command({ ping: 1 })

        // Establish and verify connection
        console.log(connectMongoDB.name + ' of ' + tag, '🏬 🏬 🏬 🏬 🏬 🏬  Mongodb Connected successfully.')
        const mongoDB = mongoClient.db()
        mongoClient.on('close', () => {
            console.warn('warn', connectMongoDB.name + ' of ' + tag, '🚪 🚪 🚪 🚪 🚪 🚪  Mongodb connection closed.')
            mongoClient = undefined
            setTimeout(async () => { await connectMongoDB() }, 6000)
        })

        mongoUserCollection = mongoDB.collection<UserBean>('users')
        mongoHotelCollection1 = mongoDB.collection<HotelsBean>('Hotel_list')
        mongoRoomCollection2 = mongoDB.collection<RoomBean>('Room_Details')


    } catch (error) {
        mongoClient = undefined
        console.error(connectMongoDB.name + ' of ' + tag, '❌ ❌ ❌ ❌ ❌ ❌  Mongodb failed to connect!!! ### Mongodb error: ' + JSON.stringify(error))
    }
}

export async function isMongoConnectedElseConnect(): Promise<boolean> {
    for (let i = 1; i < 5; i++) {
        const wait = i * 2000
        console.warn(isMongoConnectedElseConnect.name + ' of ' + tag, `✋ ✋ ✋ ✋ ✋ ✋ Waiting ${wait / 1000} sec for mongodb connect`)
        await commons.sleep(wait)
        await connectMongoDB()
    }
    return false
}

export var mongoUserCollection: Collection<UserBean>
export var mongoHotelCollection1: Collection<HotelsBean>
export var mongoRoomCollection2: Collection<RoomBean>