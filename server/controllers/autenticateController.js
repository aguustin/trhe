import userDataModel from "../models/userDataModel";

export const userRegistrationController = async (req, res) => {
    /** username: {type: String},
    userPassword: {type: String},
    userProfile:{type: String},
    userMail:{type: String},
    contacts:[{
        userId:{type: String},
        username:{type: String},
        userProfile:{type: String},
        userMail:{type: String}
    }] */
    const {username, userPassword, confirmPassword, userMail} = req.body;

    const findUser = await userDataModel.find({userMail: userMail});

    if(findUser.length > 0){
        
    }

    const createUser = new userDataModel({
        username: username,
        userPassword: userPassword,
        userMail: userMail
    })
};

export const userAuthenticationController = async (req, res) => {

};

export const userUpdateInfoController = async (req, res) => {

};

export const addNewContactController = async (req, res) => {

};

export const deleteContactController = async (req, res) => {

};