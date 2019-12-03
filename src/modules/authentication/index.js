import express from 'express';
import AuthenticationController from './AuthenticationController';
import GeneralValidator from '../../middlewares/GeneralValidator';


const authenticationRouter = express.Router();


authenticationRouter.post(
  '/auth/login',
  AuthenticationController.loginUser
);

authenticationRouter.put(
  '/auth/user/',
  GeneralValidator.verifyToken,
  AuthenticationController.updateRole
);

export default authenticationRouter;
