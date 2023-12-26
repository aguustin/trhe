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
    }]
});

export default mongoose.model("boardSchema", boardSchema);