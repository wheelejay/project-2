import { Router } from "express";
import { User } from "../models/userModel.js";
import axios from "axios";
const authRouter = Router();
authRouter.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user && user.password === password) {
    req.session.userId = user.id; 
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
// loginRequired middleware function
function loginRequired(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
authRouter.post('/api/logout', loginRequired, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});
export default authRouter;