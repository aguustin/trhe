import { Router } from "express";
import { addNewContactController, deleteContactController, userAuthenticationController, userRegistrationController, userUpdateInfoController } from "../controllers/autenticateController.js";

const router = Router();

router.post('/userRegistration', userRegistrationController);

router.post('/userAuthentication', userAuthenticationController);

router.put('/userUpdateInfo', userUpdateInfoController);

router.post('/addNewContact', addNewContactController);

router.delete('/deleteContact', deleteContactController);

export default router;