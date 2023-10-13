import UserModel from "../model/userModel";
import bcrypt from "bcrypt";

export const userRegistration =async (req, res)=>{
    try {
        
        const saltRounds = 10;
        const existingUser  = await UserModel.findOne({email:req.body.email})
        if (existingUser ){
            return res.status(409).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await UserModel({
            phone:req.body.phone,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
}
