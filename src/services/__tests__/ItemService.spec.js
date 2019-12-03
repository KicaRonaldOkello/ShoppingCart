import models from '../../database/models';
import ItemService from '../ItemService';
import { createdItem, resultImages } from '../__mocks__/itemMocks';


const { Item, Image } = models;

describe('ItemService', () => {
  describe('ItemService.createItem', () => {
    it('should create an item', async () => {
      jest.spyOn(Item, 'create').mockResolvedValue({
        dataValues: createdItem
      });
      jest.spyOn(Image, 'bulkCreate').mockResolvedValue(resultImages);
      const result = await ItemService.createItem(
        { name: 'Gucci bag' }, ['www.imgur.com']
      );
      expect(Item.create).toBeCalled();
      expect(Image.bulkCreate).toBeCalled();
      expect(result).toEqual({
        createdItem,
        imageResult: resultImages,
      });
    });
  });
  describe('ItemService.getSellerItems', () => {
    it('should return all items of a seller', async () => {
      jest.spyOn(Item, 'count').mockResolvedValue(17);
      jest.spyOn(Item, 'findAll').mockResolvedValue([createdItem]);
      jest.spyOn(Image, 'findAll').mockResolvedValue([{
        id: 2,
        url: 'www.cloudinary.com',
        itemId: 8,
        createdAt: '2019-06-08T06:06:22.562Z',
        updatedAt: '2019-06-08T06:06:22.562Z'
      }]);
      const result = await ItemService.getSellerItems(1, 1, 10);
      expect(Image.findAll).toBeCalled();
      expect(Item.findAll).toBeCalledTimes(1);
      expect(Item.count).toBeCalledTimes(1);
      expect(result.pageData.totalPages).toEqual(2);
    });
  });
  describe('ItemService.getOneItem', () => {
    it('should return ony one item', async () => {
      jest.spyOn(Item, 'findAll').mockResolvedValue([createdItem]);
      jest.spyOn(Image, 'findAll').mockResolvedValue([{
        id: 2,
        url: 'www.cloudinary.com',
        itemId: 8,
        createdAt: '2019-06-08T06:06:22.562Z',
        updatedAt: '2019-06-08T06:06:22.562Z'
      }]);
      const result = await ItemService.getOneItem(1, 1, 10);
      expect(Image.findAll).toBeCalled();
      expect(Item.findAll).toBeCalled();
      expect(result).toEqual(
        [{
          item: {

            description: 'Hand made bags from Italy',
            id: 1,
            name: 'Gucci bag',
            price: {
              from: 20000,
              to: 30000,
            },
            images: [{
              createdAt: '2019-06-08T06:06:22.562Z',
              id: 2,
              itemId: 8,
              updatedAt: '2019-06-08T06:06:22.562Z',
              url: 'www.cloudinary.com'
            }]
          }

        }]
      );
    });
  });
});
