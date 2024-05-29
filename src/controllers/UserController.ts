import { Env } from '../environment/Env';
import { UserBean } from '../schema/schemaBeans';
import { mongoUserCollection } from '../wrapper/MongoHelper'
const jwt = require("jsonwebtoken")

var bcrypt = require('bcrypt')

export const signUp = async (req: any, res: any) => {
  try {
    const params: UserBean = {
      email: req.body.email as string || undefined,
      name: req.body.name as string || undefined,
      password: req.body.password as string || undefined,
      createDate: Date.now() as number
      //lastActivity: req.body.password as string || undefined,
    }
    if (!params.email) return res.status(400).send({ status: false, Message: "Please enter valiid Email" });
    if (!params.name) return res.status(400).send({ status: false, message: "Please enter the name" });
    if (!params.password) return res.status(400).send({ status: false, message: "Please enter valiid password" });

    const insertedId = (await mongoUserCollection.insertOne(params)).insertedId;
    if (insertedId) return res.status(201).send({ status: true, message: "User Created Successfully", data: insertedId })
  } catch (error) {
    return res.status(500).send({ status: false, message: "something is error" });
  }
}

export const logIn = async (req: any, res: any, next: any) => {
  console.log("hello")
  try {

    const credentials = req.body;
    const { email, password } = credentials;
    if (!credentials) return res.status(400).send({ status: false, message: "No input by user for login." });
    if (!email) return res.status(400).send({ status: false, message: "email is required." });
    if (!password) return res.status(400).send({ status: false, message: "password is required." });


    const getUser = await mongoUserCollection.findOne({ email })
    //n check error here console.log(email);
    if (!email) return res.status(400).send({ status: false, Message: "Please enter valiid Email" });

    const providedPassword = getUser?.password;

    if (password !== providedPassword) {
      return res.status(400).send({ status: false, Message: "Please enter valiid Password" });
    }
    else {
      const uid = getUser?._id;
      const token = await jwt.sign({ userId: uid }, Env.jwtSecret, { expiresIn: "6 days" });
      return res.status(200).send({ status: true, message: "logeed in", data: { token } });
    }

  } catch (error) {
    return res.status(500).send({ status: false, msg: "something is wrong" })

  }

}

// Update users
/*export const UpdateUser = async (req: any, res: any, next: any) => {
 
   const { _id } = req.params;
   const { email, name, password } = req.body;
 
   try {
     const result = await mongoUserCollection.updateOne({ _id: _id }, { $set: { ID, name, age, emailID } });
     if (result.nModified === 0) {
       return res.status(404).send({ status: false, message: "User not found" });
     }
     return res.status(200).send({ status: true, message: "User updated successfully" });
   } catch (err) {
     return res.status(500).send({ status: false, message: err });
 }
}*/

export const DeleteUserByID = async (req: any, res: any, next: any) => {

  try {
    const required_id = req.params._id;
    console.log(required_id)

    const deletedUser = await mongoUserCollection.findOneAndDelete({ _id: required_id });
    if (deletedUser) {
      return res.status(200).send({ status: true, message: 'User deleted successfully' });
    } else {
      return res.status(404).send({ status: false, message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: 'something is wrong' });
  }
}

