import express from 'express';
import AuthenticationController from './AuthenticationController';


const authenticationRouter = express.Router();


authenticationRouter.post(
  '/auth/login',
  AuthenticationController.loginUser
);

export default authenticationRouter;
