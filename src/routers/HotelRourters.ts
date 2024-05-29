import { Router } from 'express'
import { DeleteHotelsByID, HotelsInsert, getHotelList, searchHotel } from '../controllers/HotelsController'
import { RoomsInsert, getRoomList } from "../controllers/RoomsController";

const HotelRouter = Router()

HotelRouter.post("/inserthotel", HotelsInsert);
HotelRouter.get("/allhotels", getHotelList);
HotelRouter.get("/findhotel", searchHotel);
HotelRouter.delete("/delete/:id", DeleteHotelsByID);

HotelRouter.post("/:id/roomdetails", RoomsInsert);
HotelRouter.get("/findrooms", getRoomList);

export default HotelRouter;

