import express from 'express';
import BuyerController from './BuyerController';


const buyerRouter = express.Router();


buyerRouter.get(
  '/buyer/items',
  BuyerController.getAllItems
);

buyerRouter.get(
  '/buyer/items/:id',
  BuyerController.getOneItem
);
export default buyerRouter;
