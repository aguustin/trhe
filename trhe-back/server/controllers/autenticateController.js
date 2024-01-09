import mongoose from "mongoose";
import userDataModel from "../models/userDataModel.js";
import bcrypt from "bcrypt";

export const userRegistrationController = async (req, res) => {
    const {username, userPassword, confirmPassword, userMail} = req.body;

    const findUser = await userDataModel.find({userMail: userMail});

    if(findUser.length > 0){
        res.send("el usuario ya existe");
    }else{
        if(userPassword == confirmPassword){
            const passwordEncrypted = await bcrypt.hash(userPassword, 12);
            if(passwordEncrypted){
                const createUser = new userDataModel({
                    username: username,
                    userPassword: passwordEncrypted,
                    userMail: userMail
                })
                await createUser.save();
                res.sendStatus(200);
            }else{
                res.sendStatus(500);
            }

        }else{
            console.log("las contraseñas son diferentes");
            res.sendStatus(404);
        }
    }

};

export const userAuthenticationController = async (req, res) => {
    const {userMail, userPassword} = req.body;
    const userExists = await userDataModel.find({userMail: userMail});

    if(userExists.length > 0){
        const match = await bcrypt.compare(userPassword, userExists[0].userPassword);

        if(match){
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }

    }else{
        res.sendStatus(404);
    }
};

export const userUpdateInfoController = async (req, res) => {
    const {sessionId, username, userPassword, confirmPassword, userProfile} = req.params;
    console.log(sessionId);

    if(userPassword == confirmPassword){

        const passwordEncrypted = await bcrypt.hash(userPassword, 12);

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
    const {sessionId, userId, username, userProfile, userMail} = req.body;
    const sessionIdObject = new mongoose.Types.ObjectId(sessionId);
    
    await userDataModel.updateOne(
        {_id: sessionIdObject},
        {
            $addToSet:{
                contacts:{
                    userId: userId,
                    username: username,
                    userProfile: userProfile,
                    userMail: userMail
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