import BuyerController from '../BuyerController';
import ItemService from '../../../services/ItemService';
import item, { response as res } from '../../item/__mocks__/itemMock';

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
});
