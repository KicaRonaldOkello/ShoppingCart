import express from 'express';
import ItemController from './ItemController';
import GeneralValidator from '../../middlewares/GeneralValidator';
import ItemValidator from '../../middlewares/ItemValidator';


const itemRouter = express.Router();

itemRouter.post(
  '/item/add',
  GeneralValidator.verifyToken,
  GeneralValidator.verifySeller,
  ItemValidator.validateRequestBody,
  ItemController.createItem
);

itemRouter.get(
  '/items',
  GeneralValidator.verifyToken,
  GeneralValidator.verifySeller,
  ItemController.getAllSellerItems
);

itemRouter.get(
  '/item',
  ItemController.getOneItem
);
export default itemRouter;
