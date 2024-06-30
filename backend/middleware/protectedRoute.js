import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const privateRoute = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await User.findById(verifyToken.userID);
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error while verifying token ${error}`);
    res.send(500).json({ error: "Internal Server Error" });
  }
};
