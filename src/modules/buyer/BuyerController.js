import ItemService from '../../services/ItemService';


class BuyerController {
  static async getAllItems(req, res) {
    try {
      let { page, size } = req.query;
      page = page || 1;
      size = size || 10;

      const items = await ItemService.getSellerItems(undefined, page, size);
      return res.status(200).json(items);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async getOneItem(req, res) {
    try {
      const { id } = req.params;

      const item = await ItemService.getOneItem(id);

      return res.status(200).json(item);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
export default BuyerController;
