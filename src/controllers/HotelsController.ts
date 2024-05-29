import { mongoHotelCollection1 } from '../wrapper/MongoHelper'
import { HotelsBean } from '../schema/schemaBeans';

export const HotelsInsert = async (req: any, res: any) => {
  try {
    const params: HotelsBean = {
      hotel_name: req.body.hotel_name as string || undefined,
      adress: req.body.adress as string || undefined,
      city: req.body.city as string || undefined,
      total_room: req.body.total_room as number || undefined,
      createDate: Date.now() as number || undefined,
      //lastActivity: req.body.password as string || undefined,
    }
    if (!params.hotel_name) return res.status(400).send({ status: false, Message: "Please enter hotel_name" });

    if (!params.adress) return res.status(400).send({ status: false, message: "Please enter the adress" });
    if (!params.city) return res.status(400).send({ status: false, message: "Please enter city" });
    if (!params.total_room) return res.status(400).send({ status: false, message: "Please enter total_room" });

    const insertedId = (await mongoHotelCollection1.insertMany([params])).insertedIds;
    if (insertedId) return res.status(201).send({ status: true, message: "Hotel  Created Successfully", data: insertedId })
  } catch (error) {
    return res.status(500).send({ status: false, message: "something is error" });
  }
}


export const getHotelList = async (req: any, res: any) => {

  try {
    const allData = await mongoHotelCollection1.find().toArray()
    return res.status(200).send({ status: true, message: "All the available hotels", data: allData });
  } catch (error) {
    return res.status(500).send({ status: false, message: "Something went wrong" });
  }
}

// search hotel

export const searchHotel = async (req: any, res: any) => {
  try {


    const { hotel_name, address, city, total_room, createDate, purpose } = req.query;


    const query: any = {}

    switch (purpose) {
      case "hotel_name":
        const expr1 = new RegExp(`^${hotel_name}`, 'i')
        query['hotel_name'] = { $regex: expr1 }
        break;

      case "address":
        const expr2 = new RegExp(`^${address}`, 'i')
        query['adress'] = { $regex: expr2 }
        break;

      case "city":
        // const expr3 = new RegExp(`^${city}`, 'i')
        query['city'] = { $gt: total_room }
        break;
    }

    console.log(query);
    const hotelCities = await mongoHotelCollection1.find(query).toArray();
    return res.send({ success: true, data: hotelCities })

  } catch (error: any) {
    return res.status(500).send({ status: false, message: "Something went wrong showing H-city" });

  }

}

// deletehotels

export const DeleteHotelsByID = async (req: any, res: any, next: any) => {
  console.log("hello")

  try {
    const required_id = req.params.id;
    console.log(required_id)

    const deletedHotel = await mongoHotelCollection1.findOneAndDelete({ _id: required_id });
    if (deletedHotel) {
      return res.status(200).send({ status: true, message: 'User deleted successfully' });
    } else {
      return res.status(404).send({ status: false, message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: 'something is wrong' });
  }
}


