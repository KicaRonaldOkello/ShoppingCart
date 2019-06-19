import BuyerController from '../BuyerController';
import ItemService from '../../../services/ItemService';
import item, { response as res, oneItem } from '../../item/__mocks__/itemMock';

describe('BuyerController', () => {
  describe('BuyerController.getAllItems', () => {
    it('should return all items for a buyer to choose', async () => {
      const req = {
        query: {
          page: 1,
          size: 15
        }
      };
      jest.spyOn(ItemService, 'getSellerItems').mockResolvedValue(item);
      await BuyerController.getAllItems(req, res);
      expect(res.status().json).toBeCalledWith(item);
    });
  });

  describe('BuyerController.getOneItem', () => {
    it('should return an item the buyer has chosen', async () => {
      const req = { id: 5 };
      jest.spyOn(ItemService, 'getOneItem').mockResolvedValue(oneItem);
      await BuyerController.getOneItem(req, res);
      expect(res.status().json).toBeCalledWith(item);
    });
  });
});
