import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";
import mongoose from "mongoose";

export const createChannel = async (req, res) => {
    try {

        const {name , members} = req.body;
        const userId = req.userId;

        const admin = await User.findById(userId);

        if (!admin) {
            return res.status(400).send("User and admin does not exist");
        }

        const validMembers = await User.find({ _id: { $in: members } });
        
        if (validMembers.length !== members.length) {
            return res.status(400).send("Invalid members");
        }

        const newChannel = new Channel({
            name,
            members,
            admin:userId
        });

        await newChannel.save();

        return res.status(201).json({ channel : newChannel });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
}

export const getUserChannels = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const channels = await Channel.find({
            $or: [
                {
                    members: userId
                },
                {
                    admin: userId
                }
            ]
        }).sort({ createdAt: -1 });
        return res.status(200).json({ channels });
    } catch (error) {
       console.log(error);
       return res.status(500).send("Something went wrong");
    }
}