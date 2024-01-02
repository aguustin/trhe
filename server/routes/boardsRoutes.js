import { Router } from "express";
import { addDateToCardController, addFrontPageController, addMemberInCardController, createCardController, createTableController, getAllTables, getBoardTablesController, getTablesController, organizeBoardTablesController } from "../controllers/boardsContoller.js";

const router = Router();

router.get('/boardTables', getBoardTablesController);

router.post('/organizeBoardTables', organizeBoardTablesController);

router.get('/tables', getTablesController);

router.post('/createTable', createTableController);

router.put('/createCard/:sessionId/:tableId/:cardTitle', createCardController);

router.put('/addFrontPage', addFrontPageController);

router.put('/addDateToCard', addDateToCardController);

router.put('/addMemberInCard', addMemberInCardController);

router.get('/getAllTables', getAllTables);

export default router;

