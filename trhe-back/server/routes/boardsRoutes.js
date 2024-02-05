import { Router } from "express";
import { addDateToCardController, 
    //addFrontPageController, 
    addMemberInCardController, 
    addActivityToCardController, 
    createBoardTableController, 
    createCardController, 
    createTableController, 
    getAllTables, 
    getBoardTablesController, 
    getTablesByBoardController, 
    deleteAllController, 
    cardSecondaryInfoController} from "../controllers/boardsContoller.js";

const router = Router();

router.get('/boardTables/:sessionId', getBoardTablesController);

router.get('/getTablesByBoard/:sessionId/:boardId', getTablesByBoardController);

router.put('/createBoard/:sessionId/:boardTablesTitle/:backColor/:boardLink/:acces', createBoardTableController);

router.post('/createTable', createTableController);

router.put('/createCard/:sessionId/:boardId/:tableId/:cardTitle', createCardController);

//router.put('/addFrontPage/:sessionId/:boardId/:tableId/:cardId/:frontPage', addFrontPageController);

router.put('/addDateToCard/:sessionId/:boardId/:tableId/:cardId/:cardDate', addDateToCardController);

router.put('/addMemberInCard/:sessionId/:boardId/:tableId/:cardId/:username/:userProfile/:userMail', addMemberInCardController);

router.post(`/cardInfo`, cardSecondaryInfoController);

router.put('/activityCard/:sessionId/:boardId/:tableId/:cardId/:memberName/:memberComment', addActivityToCardController);

router.get('/getAllTables', getAllTables);

router.delete('/deleteAll', deleteAllController);

export default router;

