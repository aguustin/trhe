import mongoose from "mongoose";
import userDataModel from "../models/userDataModel.js";
import bcrypt from "bcrypt";

export const userRegistrationController = async (req, res) => {
    const {email, username, password, confirmPassword} = req.body;
    console.log(email, username, password, confirmPassword);
    const findUser = await userDataModel.find({email: email});

    if(findUser.length > 0){
        res.send("el usuario ya existe");
    }else{
        if(password == confirmPassword){
            const passwordEncrypted = await bcrypt.hash(password, 12);
            if(passwordEncrypted){
                console.log("asdasdasdasd");
                const createUser = new userDataModel({
                    username: username,
                    userPassword: passwordEncrypted,
                    userMail: email
                })
                await createUser.save();
                res.sendStatus(200);
            }else{
                res.sendStatus(203);
            }

        }else{
            console.log("las contraseñas son diferentes");
            res.sendStatus(203);
        }
    }

};

export const userAuthenticationController = async (req, res) => {
    const {email, password} = req.body;
    const userExists = await userDataModel.find({userMail: email});

    console.log("users: ", userExists[0].userPassword);

    if(userExists.length > 0){
        const match = await bcrypt.compare(password, userExists[0].userPassword);

        if(match.length > 0){
            res.send(userExists);
        }else{
            res.send(userExists);
        }

    }else{
        res.send(userExists);
    }
};

export const userUpdateInfoController = async (req, res) => {
    const {sessionId, username, password, confirmPassword, userProfile} = req.params;
    console.log(sessionId);

    if(password == confirmPassword){
        const passwordEncrypted = await bcrypt.hash(password, 12);

        await userDataModel.updateOne(
            {_id: sessionId},
            {
                $set:{
                    username: username,
                    userPassword: passwordEncrypted,
                    userProfile: userProfile
                }
            }
        )
    }else{
        res.send("las contranas no coinciden");
    }
    res.sendStatus(200);
};

export const addNewContactController = async (req, res) => {
    const {sessionId, userId, username, userProfile, email} = req.body;
    const sessionIdObject = new mongoose.Types.ObjectId(sessionId);
    
    await userDataModel.updateOne(
        {_id: sessionIdObject},
        {
            $addToSet:{
                contacts:{
                    userId: userId,
                    username: username,
                    userProfile: userProfile,
                    email: email
                }
            }
        }
    )
    res.sendStatus(200);
};

export const deleteContactController = async (req, res) => {
    const sessionId = req.params.sessionId;
    const userId = req.params.userId;
    
    await userDataModel.updateOne(
        {_id: sessionId},
        {
            $pull:{
                contacts:{
                    userId: userId
                }
            }
        }
    )
    
    res.sendStatus(200);
};

export const getAll = async (req, res) => {
    const a = await userDataModel.find();
    res.send(a);
}