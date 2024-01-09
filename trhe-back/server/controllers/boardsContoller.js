
import boardModel from "../models/boardModel.js";

export const getBoardTablesController = async (req, res) => {
    const {sessionId} = req.params;
    const getBoardTables = await boardModel.find({userId: sessionId});
    res.send(getBoardTables);
};

export const getTablesByBoardController = async (req, res) => {
    const {sessionId, boardId} = req.params;
    const getTables = await boardModel.find(
    {userId: {$eq: sessionId } },
    {"boardTables":{
         $elemMatch:{
                _id: boardId
        }
    }
    }
    )

    res.send(getTables);
};

export const createBoardTableController = async (req, res) => { //---------------------------------seguir aca
    const {sessionId, boardTablesTitle, acces} = req.body;

    await boardModel.updateOne(
        {userId: { $eq: sessionId } },
        {
            $addToSet:{
                boardTables:{
                    boardTablesTitle: boardTablesTitle,
                    acces: acces
                }
            }
        }
    )

    res.sendStatus(200);
};

export const createTableController = async (req, res) => {
    const {sessionId, boardId, tableTitle} = req.body;
   
        await boardModel.updateOne(
            {userId: {$eq:sessionId}},
            {
                $addToSet:{
                    "boardTables.$[i].table": {tableTitle:tableTitle}
                }
            },
            {
                arrayFilters:[
                    {"i._id": boardId}
                ]
            }
        )
        res.sendStatus(200);
    
};


export const createCardController = async (req, res) => {
    const {sessionId, boardId, tableId, cardTitle} = req.params;
 
    const updateCards = await boardModel.updateOne(
        {userId: {$eq: sessionId}},
        {
            $addToSet:{
                "boardTables.$[i].table.$[x].card":{
                    cardTitle: cardTitle
                }
            }
        },
        {
            arrayFilters:[
                {"i._id": boardId},
                {"x._id": tableId}
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

    const { sessionId, boardId, tableId, cardId, frontPage } = req.params;

    const updateFrontPage = await boardModel.updateOne(
        {userId: { $eq:sessionId } },
        {
            $set:{
                "boardTables.$[x].table.$[i].card.$[o].frontPage": frontPage
            }
        },
        {
            arrayFilters:[
                { "x._id": boardId},
                { "i._id": tableId},
                { "o._id": cardId}
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

    const { sessionId, boardId, tableId, cardId, cardDate } = req.params;

    const updateFrontPage = await boardModel.updateOne(
        {userId: { $eq: sessionId } },
        {
            $set:{
                "boardTables.$[x].table.$[i].card.$[o].cardDate": cardDate
            }
        },
        {
            arrayFilters:[
                { "x._id": boardId},
                { "i._id": tableId},
                { "o._id": cardId}
            ]
        }
    )

    if(updateFrontPage){
        return res.sendStatus(200);
    }else{
        return res.sendStatus(500);
    }

};

export const addMemberInCardController = async (req, res) => {

    const { sessionId, boardId, tableId, cardId, username, userProfile, userMail } = req.params;

    const updateUsersList = await boardModel.updateOne(
        {userId: {$eq: sessionId } },
        {
            $addToSet:{
                "boardTables.$[x].table.$[i].card.$[o].usersList":{
                    username: username,
                    userProfile: userProfile,
                    userMail: userMail
                }
            }
        },
        {
            arrayFilters:[
                { "x._id": boardId },
                { "i._id": tableId },
                { "o._id": cardId }
            ]
        }
    )

    if(updateUsersList){
        return res.sendStatus(200);
    }else{
        return res.sendStatus(500);
    }
};


export const getAllTables = async (req, res) => {
    const getAllTables = await boardModel.find({});
    res.send(getAllTables);
}
