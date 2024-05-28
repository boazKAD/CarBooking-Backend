
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
    names: { 
        type: String,  
    },
    phone: { 
        type: String, 
    },
    status: { 
        type: String, 
    },
    drivingLicence: { 
        type: String, 
    },
    nid: { 
        type: String, 
    },
    companyProfileId: {
        type: mongoose.Types.ObjectId,
        ref: "companyProfile",
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
        enum: ['user', 'admin', 'driver'], 
        default: 'user' 
    },

},
{timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
