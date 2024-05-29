import { mongoRoomCollection2, mongoHotelCollection1 } from '../wrapper/MongoHelper'
import { RoomBean } from '../schema/schemaBeans';
import { ObjectId } from 'mongodb';


export const RoomsInsert = async (req: any, res: any) => {

    try {
        const hotelId = req.params.id; // Get the hotel ID from the request parameters
        const hotelReq = await mongoHotelCollection1.findOne({ _id: new ObjectId(hotelId) }); // Find the hotel with the matching ID

        if (!hotelReq) {
            return res.status(404).send({ status: false, message: "Hotel not found" });
        }


        const params: RoomBean = req.body;
        params.hotel_id = hotelId; // Assign the hotel ID to the room details
        params.hotelName = hotelReq.hotel_name; // Assign the hotel name to the room details

        console.log(hotelId)

        const roomData = await mongoRoomCollection2.insertMany([params]);
        if (roomData) {
            return res.status(201).send({ status: true, message: "Room details created successfully", data: roomData });
        } else {
            return res.status(500).send({ status: false, message: "Failed to create room details" });
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: "something is error" });
    }
}



export const getRoomList = async (req: any, res: any) => {
    try {
        const hotelId = req.params.id
        const hotelReq = await mongoRoomCollection2.find({ _id: new ObjectId(hotelId) });

        if (!hotelReq) {
            return res.status(404).send({ status: false, message: "Hotel not found" });
        }

        const total_Rooms = req.query.total_Rooms
        const hotelRoom = await mongoRoomCollection2.find({total_Rooms: total_Rooms }).toArray();
        return res.status(400).send({ status: "true", message: "Rooms details", Data: hotelRoom })

    } catch (error) {
        return res.status(404).send({ status: "false", message: error })
    }
}
