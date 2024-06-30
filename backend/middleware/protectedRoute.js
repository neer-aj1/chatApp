import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const privateRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(decodedToken.userID).select("-password");
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(`Error while verifying token ${error}`);
  }
};

export default privateRoute;
