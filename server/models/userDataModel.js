import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String},
    userPassword: {type: String},
    userProfile:{type: String},
    userMail:{type: String},
    contacts:[{
        userId:{type: String},
        username:{type: String},
        userProfile:{type: String},
        userMail:{type: String}
    }]
})

export default mongoose.model("userSchema", userSchema); 