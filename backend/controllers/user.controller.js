import User from "../models/user.model.js";
export const getUsers = async (req, res) => {
    try {
        const requestingUser = req.user._id;
        const users = await User.find({ _id: { $ne: requestingUser } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log(`Error while getting users ${error}`);
        res.send(500).json({ error: "Internal Server Error" });
    }
}