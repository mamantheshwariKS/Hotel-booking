import jwt, { Jwt } from "jsonwebtoken";
import { Env } from '../environment/Env';
import { JwtPayload } from 'jsonwebtoken';
const logIn = require("../controllers/UserController");



//Authentication
export const authentication = async function (req:any, res:any, next:any) {
    try {
        let token = req.headers["x-api-key"]
        if (!token)
        token= req.headers["X-Api-Key"]
        if (!token) return res.status(400).send({ status: false, msg: "You are not logged in. Token is Missing." })
        
        let decodeToken : JwtPayload | string;
        try {
            decodeToken =  await jwt.verify(token, Env.jwtSecret) as JwtPayload
            if(!decodeToken) return res.status(401).send({status:false, message:"Invalid authentication"})
        } catch (err) {
            return res.status(401).send({ status: false, msg: "Invalid Token", error: err })
        }

        interface JwtPayload {
            userId: string;
          }

        req.userId = decodeToken.userId;
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: "Error", error: err })
    }
}
