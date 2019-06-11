import ItemController from '../ItemController';
import ItemService from '../../../services/ItemService';
import item, { response as res } from '../__mocks__/itemMock';

describe('ItemController', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  describe('ItemController.createItem', () => {
    it('should throw an error when the request body is empty', async () => {
      const req = { body: {} };
      await ItemController.createItem(req, res);
      expect(res.status().json).toBeDefined();
    });
    it('should create an item', async () => {
      const req = {
        body: {
          item: {
            name: 'Samsung Phones',
    	      description: 'Brand new LG phone straight from China',
    	      sellerId: 2,
    	      price: '200000-250000',
    	      images: [
    		      'www.imgur.com',
    		      'www.cloudinary.com',
    		      'www.googlepics.com'
    		    ]
          }
        }
      };
      jest.spyOn(ItemService, 'createItem').mockResolvedValue(item);
      await ItemController.createItem(req, res);
      expect(res.status().json).toBeCalledWith(item);
    });
  });
  describe('ItemController.getAllSellerItems', () => {
    it('should get all items for a seller', async () => {
      const req = {
        query: {
          page: 2,
          size: 12,
        },
        currentUser: {
          id: 3
        }
      };
      jest.spyOn(ItemService, 'getSellerItems').mockResolvedValue(item);
      await ItemController.getAllSellerItems(req, res);
      expect(res.status().json).toBeCalledWith(item);
    });
  });
  describe('ItemController.getOneItem', () => {
    it('should return one item', async () => {
      const req = {
        query: {
          page: 2,
          size: 12,
          itemId: 3
        }
      };
      jest.spyOn(ItemService, 'getOneItem').mockResolvedValue(item);
      await ItemController.getOneItem(req, res);
      expect(ItemService.getOneItem).toBeCalledTimes(1);
      expect(res.status().json).toBeCalledWith(item);
    });
  });
});
