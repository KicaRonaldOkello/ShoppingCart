import models from '../database/models';
import RemoveDataValues from '../utils/removeDataValues';

const { Item, Image } = models;

class ItemService {
  static async createItem(data, images) {
    const item = await Item.create({ ...data }, { returning: true });
    const strippedImages = images.map(image => ({
      url: image, itemId: item.dataValues.id
    }));
    const imageResult = await Image.bulkCreate(strippedImages);
    const createdItem = RemoveDataValues.removeDataValues(item);
    return { createdItem, imageResult };
  }

  static async getSellerItems(sellerId, page = 1, size = 10) {
    let totalItems;
    let items;
    if (!sellerId) {
      totalItems = await Item.count();
      items = await Item.findAll({
        offset: (page * size) - size,
        limit: size,
        attributes: ['id', 'name', 'sub_title', 'price']
      });
    } else {
      totalItems = await Item.count({
        where: { sellerId }
      });
      items = await Item.findAll({
        where: { sellerId },
        offset: (page * size) - size,
        limit: size,
        attributes: ['id', 'name', 'sub_title', 'price']
      });
    }
    const strippedItems = RemoveDataValues.removeDataValues(items);
    const itemWithImages = strippedItems.map(async (item) => {
      const images = await Image.findAll({
        where: {
          itemId: item.id
        },
        attributes: ['url']
      });

      return {
        id: item.id,
        name: item.name,
        sub_title: item.sub_title,
        price: { from: item.price[0].value, to: item.price[1].value },
        image: images[0].url
      };
    });
    const result = await Promise.all(itemWithImages);
    const pageData = {
      totalItems,
      page,
      perPage: size,
      totalPages: Math.ceil(totalItems / size) || 1
    };
    return { result, pageData };
  }

  static async getOneItem(id) {
    const items = await Item.findAll({ where: { id } });
    const strippedItems = RemoveDataValues.removeDataValues(items);
    const itemWithImages = strippedItems.map(async (item) => {
      const images = await Image.findAll({
        where: {
          itemId: item.id
        }
      });
      const {
        id: _id, name, sub_title: subTitle, description, price
      } = item;
      return {
        item: {
          id: _id,
          name,
          subTitle,
          description,
          price: { from: price[0].value, to: price[1].value },
          images
        }
      };
    });
    const result = await Promise.all(itemWithImages);
    return result;
  }
}
export default ItemService;
