import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async(req, res, next) => {
    let users;
    
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }

    if(!users){
        return res.status(404).json({message: "No users found"});
    }

    return res.status(200).json({users});
}

export const signup = async(req, res,next) => {
    const {
        name,
        email,
        password,
    } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if(existingUser){
        return res.status(409).json({message: "User already exists. Login instead"});
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        blogs: [],
        password:hashedPassword,
    });



    try {
        await user.save();
    } catch (error) {
        return console.log(error)
    }
    
    return res.status(201).json({user});
}

export const login = async(req, res, next) => {
    const {
        email,
        password
    } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: "Couldn't find user. Please login"});
        }

        const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

        if(!isPasswordCorrect){
            return res.status(404).json({message: "Wrong password. Please try again"});
        }

        return res.status(200).json({message: "Login Successfull"});


    } catch (error) {
        return console.log(error);
    }
}