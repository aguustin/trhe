import { Router } from "express";
import { addDateToCardController, addFrontPageController, addMemberInCardController, createBoardTableController, createCardController, createTableController, getAllTables, getBoardTablesController, getTablesByBoardController } from "../controllers/boardsContoller.js";

const router = Router();

router.get('/boardTables', getBoardTablesController);

router.post('/createBoardTable', createBoardTableController);

//router.get('/tables', getTablesController);

router.post('/createTable', createTableController);

router.put('/createCard/:sessionId/:boardId/:tableId/:cardTitle', createCardController);

router.put('/addFrontPage/:sessionId/:boardId/:tableId/:cardId/:frontPage', addFrontPageController);

router.put('/addDateToCard/:sessionId/:boardId/:tableId/:cardId/:cardDate', addDateToCardController);

router.put('/addMemberInCard/:sessionId/:boardId/:tableId/:cardId/:username/:userProfile/:userMail', addMemberInCardController);

router.get('/getAllTables', getAllTables);

router.get('/getTablesByBoard/:sessionId/:boardId', getTablesByBoardController);

export default router;

