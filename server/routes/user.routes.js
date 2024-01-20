
import { Router } from "express";
import { User } from "../models/userModel.js";
const userRouter =  Router();
userRouter.post('/api/users', async(req, res) =>{
    const { fname: fname, lname: lname, email: email, password: password, sweight: sweight, gweight: gweight} =req.body;
    console.log(fname)
})
export default userRouter;