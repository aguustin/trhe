import { Router } from "express";
import { addDateToCardController, addFrontPageController, addMemberInCardController, createCardController, createTableController, getBoardTablesController, getTablesController, organizeBoardTablesController } from "../controllers/boardsContoller.js";

const router = Router();

router.get('/boardTables', getBoardTablesController);

router.post('/organizeBoardTables', organizeBoardTablesController);

router.get('/tables', getTablesController);

router.post('/createTable', createTableController);

router.put('/createCard', createCardController);

router.put('/addFrontPage', addFrontPageController);

router.put('/addDateToCard', addDateToCardController);

router.put('/addMemberInCard', addMemberInCardController);

export default router;

