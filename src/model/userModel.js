
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    isActive:{
        type: Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    name: { 
        type: String,  
    },
    phone: { 
        type: String, 
    },
    picture: {
        type: String 
        },
    gender: { 
        type: String 
    },
    email: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String, 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
},
{timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
