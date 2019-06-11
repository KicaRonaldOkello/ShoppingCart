import ItemService from '../../services/ItemService';


class ItemController {
  static async createItem(req, res) {
    try {
      const { item } = req.body;
      const itemImages = item.images;
      delete item.images;
      const pricesRange = item.price.split('-', 2).map(
        element => parseInt(element, 10)
      );
      item.price = pricesRange;
      const data = await ItemService.createItem(item, itemImages);

      res.status(201).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async getAllSellerItems(req, res) {
    try {
      let { page, size } = req.query;
      page = page || 1;
      size = size || 10;
      const { currentUser } = req;
      const items = await ItemService.getSellerItems(currentUser.id, page, size);

      return res.status(200).json(items);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async getOneItem(req, res) {
    try {
      let { page, size } = req.query;
      page = page || 1;
      size = size || 10;
      const { itemId } = req.query;
      const items = await ItemService.getOneItem(itemId, page, size);

      return res.status(200).json(items);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
export default ItemController;
