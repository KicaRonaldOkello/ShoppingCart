import models from '../database/models';

const { Item, Image } = models;

class ItemService {
  static async createItem(data, images) {
    const item = await Item.create({ ...data }, { returning: true });
    const strippedImages = images.map(image => ({
      url: image, itemId: item.dataValues.id
    }));
    const imageResult = await Image.bulkCreate(strippedImages);
    item.images = imageResult;
    return { item, imageResult };
  }

  static async getSellerItems(sellerId, page = 1, size = 10) {
    let totalItems;
    let items;
    if (!sellerId) {
      totalItems = await Item.count();
      items = await Item.findAll({
        offset: (page * size) - size,
        limit: size
      });
    } else {
      totalItems = await Item.count({
        where: { sellerId }
      });
      items = await Item.findAll({
        where: { sellerId },
        offset: (page * size) - size,
        limit: size
      });
    }
    
    const itemWithImages = items.map(async (item) => {
      const images = await Image.findAll({
        where: {
          itemId: item.dataValues.id
        }
      });
      return { item, images };
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

  static async getOneItem(id, page, size) {
    const items = await Item.findAll({
      where: { id },
      offset: (page * size) - size,
      limit: size
    });
    const itemWithImages = items.map(async (item) => {
      const images = await Image.findAll({
        where: {
          itemId: item.dataValues.id
        }
      });
      return { item, images };
    });
    const result = await Promise.all(itemWithImages);
    return result;
  }
}
export default ItemService;
