import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
          return res.status(409).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          username,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(`Error while signing up ${error}`);
        res.send(500).json({error: "Internal Server Error"});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const username = email;
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if(!user){
            res.status(400).json({error: "Invalid Credentials"});
            return;
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            res.status(400).json({error: "Invalid Credentials"});
            return;
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        })
    } catch (error) {
        console.log(`Error while logging in ${error}`);
        res.send(500).json({error: "Internal Server Error"});
    }
}