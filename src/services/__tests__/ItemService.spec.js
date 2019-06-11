import models from '../../database/models';
import ItemService from '../ItemService';


const { Item, Image } = models;

describe('ItemService', () => {
  describe('ItemService.createItem', () => {
    it('should create an item', async () => {
      jest.spyOn(Item, 'create').mockResolvedValue({
        dataValues: {
          id: 1,
          name: 'Gucci bag',
          description: 'Hand made bags from Italy',
          price: 20000 - 30000
        }
      });
      jest.spyOn(Image, 'bulkCreate').mockResolvedValue([
        {
          id: 1,
          url: 'www.imgur.com',
          itemId: 17,
          createdAt: '2019-06-08T07:34:57.793Z',
          updatedAt: '2019-06-08T07:34:57.793Z'
        }
      ]);
      const result = await ItemService.createItem(
        { name: 'Gucci bag' }, ['www.imgur.com']
      );
      expect(Item.create).toBeCalled();
      expect(Image.bulkCreate).toBeCalled();
      expect(result).toEqual({
        imageResult: [{
          createdAt: '2019-06-08T07:34:57.793Z',
          id: 1,
          itemId: 17,
          updatedAt: '2019-06-08T07:34:57.793Z',
          url: 'www.imgur.com'
        }],
        item: {
          dataValues: {
            description: 'Hand made bags from Italy',
            id: 1,
            name: 'Gucci bag',
            price: -10000
          },
          images: [{
            createdAt: '2019-06-08T07:34:57.793Z',
            id: 1,
            itemId: 17,
            updatedAt: '2019-06-08T07:34:57.793Z',
            url: 'www.imgur.com'
          }]
        }
      });
    });
  });
  describe('ItemService.getSellerItems', () => {
    it('should return all items of a seller', async () => {
      jest.spyOn(Item, 'count').mockResolvedValue(17);
      jest.spyOn(Item, 'findAll').mockResolvedValue([{
        dataValues: {
          id: 1,
          name: 'Gucci bag',
          description: 'Hand made bags from Italy',
          price: 20000 - 30000,
        }
      }]);
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
});
