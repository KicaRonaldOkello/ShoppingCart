import express from 'express';
import ItemController from './ItemController';
import GeneralValidator from '../../middlewares/GeneralValidator';
import ItemValidator from '../../middlewares/ItemValidator';


const itemRouter = express.Router();

itemRouter.use(
  GeneralValidator.verifyToken,
  GeneralValidator.verifySeller,
);

itemRouter.post(
  '/item/add',
  ItemValidator.validateRequestBody,
  ItemController.createItem
);

itemRouter.get(
  '/item',
  ItemController.getAllSellerItems
);
export default itemRouter;
