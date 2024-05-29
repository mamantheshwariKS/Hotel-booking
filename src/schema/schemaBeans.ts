import { ObjectId } from 'mongodb'



export interface UserBean {
    _id?: ObjectId
    email?: string
    name?: string
    password?: string
    createDate?: number
    lastActivity?: number
}

export interface HotelsBean {
    _id?: ObjectId
    hotel_name?: string
    adress?: string
    city?: string
    total_room?: number
    createDate?: number
    lastActivity?: number
}

export interface RoomBean {
    _id?: ObjectId
    hotel_id?: ObjectId
    hotelName?: string
    total_Rooms?: number
    s_bedRoom?: number
    sr_Price?: number
    d_bedRoom?: number
    dr_Price?: number
    }