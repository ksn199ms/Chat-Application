import User from "../models/UserModel.js";
import jwt from "jsonwebtoken"


const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email,userId) => {
    return jwt.sign({email,userId}, process.env.JWT_KEY, {
        expiresIn: maxAge
    })
}

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        const user = await User.create({ email, password });
        res.cookie("jwt", createToken(user.email, user._id), {
            maxAge,
            secure:true,
            sameSite: "none",
        });

        res.status(201).json({ user: {
            id: user._id,
            email: user.email,
            profileSetup: user.profileSetup
        } });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
}