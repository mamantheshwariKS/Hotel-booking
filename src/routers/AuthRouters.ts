import { Router } from 'express'
import { DeleteUserByID, signUp, logIn  } from '../controllers/UserController'
const authRouter = Router()

authRouter.post("/signup",signUp);
authRouter.post("/login",logIn);
authRouter.delete("/delete:_id",DeleteUserByID);

export default authRouter 