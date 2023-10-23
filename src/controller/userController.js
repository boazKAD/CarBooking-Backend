import UserModel from "../model/userModel";
import mongoose from "mongoose";

import bcrypt from 'bcrypt';

export const userRegistration = async (req, res) => {
    try {
        const saltRounds = 10;
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await UserModel({
            phone: req.body.phone,
            name: req.body.name,
            role: req.body.role,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
};


export const getAllUser = async (req, res) => {
    try {
        const result = await UserModel.find().sort({ updatedAt: -1 });
        res.status(200).json({ message: 'All User retrived  successfully', result });
    } catch (error) {
        res.status(500).json({ error: ' INTERNAL SERVER ERROR ' });
    }
}
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const data = await UserModel.findOne({ _id: id });
        res.status(200).json({ message: ' retrive User  successfully', data });
    } catch (error) {
        res.status(500).json({ error: ' INTERNAL SERVER ERROR ' });

    }
}

export const updateUserById = async (req, res) => {
    try {
        const id = req.params.id
        const updates = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const data = await UserModel.findOneAndUpdate({ _id: id }, updates, { new: true })

        if (!data) {
            return res.status(404).json({ message: "User Not Found " })
        }
        res.status(200).json({ message: 'User Updated successfully', data });

    } catch (error) {
        res.status(500).json({ error: ' INTERNAL SERVER ERROR ' });
    }
}