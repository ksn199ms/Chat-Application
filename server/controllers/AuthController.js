import User from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import {renameSync, unlinkSync} from "fs"


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
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User does not exist");
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(400).send("Incorrect password");
        }

        res.cookie("jwt", createToken(user.email, user._id), {
            maxAge,
            secure:true,
            sameSite: "none",
        });

        res.status(200).json({ user: {
            id: user._id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color
        } });
    } catch (error) {
        
    }
}

export const getUserinfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(400).send("User does not exist");
        }

        return res.status(200).json( {
            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {userId} = req;
        const {firstName, lastName, color} = req.body;
        console.log(req.body);
        if(!firstName || !lastName) {
            return res.status(400).send("All fields are required");
        }

        const userData = await User.findByIdAndUpdate(userId,{
            firstName,
            lastName,
            color,
            profileSetup: true
        },{new: true,runValidators: true});
        if (!userData) {
            return res.status(400).send("User does not exist");
        }

        return res.status(200).json({
            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        })
    } catch (error) {
       console.log(error); 
    }
}

export const  addProfileImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).send("file not found");
        }

        const date = Date.now();
        const fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {image: fileName},
            {
                new: true,
                runValidators: true
            }
        )
        if (!updatedUser) {
            return res.status(400).send("User does not exist");
        }

        return res.status(200).json({
            image: updatedUser.image
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
}

export const deleteProfileImage = async (req, res) => {
    try {
        const {userId} = req;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send("User does not exist");
        }
        
        if(user.image)(
            unlinkSync(user.image)
        )
    
        user.image = null;
        await user.save();

        return res.status(200).send("Profile image deleted")
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
}