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
    const totalItems = await Item.count({
      where: { sellerId }
    });
    const items = await Item.findAll({
      where: { sellerId },
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
    const pageData = {
      totalItems,
      page,
      perPage: size,
      totalPages: Math.ceil(totalItems / size) || 1
    };
    return { result, pageData };
  }
}
export default ItemService;
