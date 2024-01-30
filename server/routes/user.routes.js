
import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { UserWeight } from "../models/userWeightModel.js";

const userRouter =  Router();
userRouter.post('/api/users', async(req, res) =>{
    const { fname: fname, lname: lname, email: email, password: password, sweight: sweight, gweight: gweight} =req.body;
    console.log("you are here")
    bcrypt.hash(password, 8).then(hash => {
        User.create({ fName: fname, lName: lname, email: email, password: hash, sWeight: sweight, gWeight: gweight }).then(user => res.send({ user }))
    })
})
userRouter.get('/api/users/:userId', async(req, res) => {
    User.findOne({ where: { id: req.params.userId }}).then(user => res.send({ user }));
})
userRouter.get('api/users/:userId/weights', async(req, res) => {
    UserWeight.findAll({ where: { userId: req.params.userId }}).then(weights => res.send({ weights }));
})
export default userRouter;