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
        boardTablesTitle: {type: String},
        boardTableBackground: {type: String},
        acces: {type: String},
        boardLink: {type: String},
        table:[{
           tableTitle:{type: String},
           card:[{
                cardTitle: {type: String},
                frontPage:{type: String},
                cardDate: {type: Date},
                cardDescription: {type: String},
                usersList: [{
                    username:{type: String},
                    userProfile:{type: String},
                    userMail:{type: String}
                }],
            /* cardAttachments:[{
                    cardImg: {type: String}
                }],*/
                cardActivity:[{
                    memberName:{type: String},
                    memberComment:{type: String}
                }]
            }]
        }]
    }]
});

export default mongoose.model("boardSchema", boardSchema);