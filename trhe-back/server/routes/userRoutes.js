import { Router } from "express";
import { addNewContactController, deleteContactController, getAll, userAuthenticationController, userRegistrationController, userUpdateInfoController } from "../controllers/autenticateController.js";

const router = Router();

router.post('/userRegistration', userRegistrationController);

router.post('/userAuthentication', userAuthenticationController);

router.put('/userUpdateInfo/:sessionId/:username/:userPassword/:confirmPassword/:userProfile', userUpdateInfoController);

router.post('/addNewContact', addNewContactController);

router.delete('/deleteContact/:sessionId/:userId', deleteContactController);

router.get('/getAll', getAll);

export default router;