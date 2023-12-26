import mongoose from "mongoose";
import boardModel from "../models/boardModel.js";

export const getBoardTablesController = async (req, res) => {
    const getBoardTables = await boardModel.find({userId: sessionId});
    res.send(getBoardTables);
};

export const organizeBoardTablesController = async (req, res) => {

};

export const getTablesController = async (req, res) => {

};

export const createTableController = async (req, res) => {
    const {sessionId, tableTitle} = req.body;

    const createTable = await new boardModel({
        userId: sessionId,
        boardTables:[{
            table:[{
               tableTitle: tableTitle,
            }]
        }]
    });

    return createTable.save();
};

export const createCardController = async (req, res) => {
   
    const {sessionId, tableId, cardTitle} = req.params;

    const tableIdObject = new mongoose.Types.ObjectId(tableId);

    const updateCards = await boardModel.updateOne(
        {userId: sessionId},
        {
            $addToSet:{
                "boardTables.$[].table.$[i].card":{
                    cardTitle: cardTitle
                }
            }
        },
        {
            arrayFilters:[
                {"i._id": tableIdObject}
            ]
        }
    );

    if(updateCards){
        return res.sendStatus(200);
    }else{
        return res.sendStatus(500);
    }

};

export const addFrontPageController = async (req, res) => {

    const { sessionId, tableId, cardId, frontPage } = req.params;

    const tableIdObject = new mongoose.Types.ObjectId(tableId);
    const cardIdObject = new mongoose.Types.ObjectId(cardId);

    const updateFrontPage = await boardModel.updateOne(
        {userId: sessionId},
        {
            $set:{
                "boardTables.$[].table.$[i].card.$[o].frontPage": frontPage
            }
        },
        {
            arrayFilters:[
                { "i._id": tableIdObject},
                { "o._id": cardIdObject}
            ]
        }
    )

    if(updateFrontPage){
        return res.sendStatus(200);
    }else{
        return res.sendStatus(500);
    }

};

export const addDateToCardController = async (req, res) => {

    const { sessionId, tableId, cardId, cardDate } = req.params;

    const tableIdObject = new mongoose.Types.ObjectId(tableId);
    const cardIdObject = new mongoose.Types.ObjectId(cardId);

    const updateDate = await boardModel.updateOne(
        {userId: sessionId},
        {
            $set:{
                "boardTables.$[].table.$[i].card.$[o].cardDate": cardDate
            }
        },
        {
            arrayFilters:[
                { "i._id": tableIdObject},
                { "o._id": cardIdObject}
            ]
        }
    )

    if(updateDate){
        return res.sendStatus(200);
    }else{
        return res.sendStatus(500);
    }

};

export const addMemberInCardController = async (req, res) => {
    /*userId: {type: String},
    members:[{
        memberListId:{type: String},
        membername:{type: String},
        memberProfile:{type: String},
        memberMail:{type: String}
    }],
    boardTables:[{
        table:[{
           tableTitle:{type: String},
           card:[{
            cardTitle: {type: String},
            frontPage: {type: String},
            cardDate: {type: Date},
            usersList: [{
                userListId:{type: String},
                username:{type: String},
                userProfile:{type: String},
                userMail:{type: String}
            }]
           }]
        }]
    }]*/
    const { sessionId, tableId, cardId, cardDate, userId, username, userProfile, userMail } = req.params;

    const tableIdObject = new mongoose.Types.ObjectId(tableId);
    const cardIdObject = new mongoose.Types.ObjectId(cardId);

    const updateUsersList = await boardModel.updateOne(
        {userId: sessionId},
        {
            $addToSet:{
                "boardTables.$[].table.$[i].card.$[o].usersList":{
                    userListId: userId,
                    username: username,
                    userProfile: userProfile,
                    userMail: userMail
                }
            }
        },
        {
            arrayFilters:[
                {"i._id": tableIdObject},
                {"o._id": cardIdObject}
            ]
        }
    )

    if(updateUsersList){
        return res.sendStatus(200);
    }else{
        return res.sendStatus(500);
    }
};