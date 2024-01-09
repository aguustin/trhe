import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    userId: {type: String},
    members:[{
        memberListId:{type: String},
        membername:{type: String},
        memberProfile:{type: String},
        memberMail:{type: String}
    }],
    boardTables:[{
        boardTableBackground: {type: String},
        boardTablesTitle: {type: String},
        acces: {type: Number},
        table:[{
           tableTitle:{type: String},
           card:[{
            cardTitle: {type: String},
            frontPage: {type: String},
            cardDate: {type: Date},
            usersList: [{
                username:{type: String},
                userProfile:{type: String},
                userMail:{type: String}
            }]
           }]
        }]
    }]
});

export default mongoose.model("boardSchema", boardSchema);