import joi from '@hapi/joi';

class ItemValidator {
  static validateRequestBody(req, res, next) {
    const schema = joi.object().keys({
      name: joi.string().trim().required(),
      description: joi.string().trim().required(),
      sellerId: joi.number().integer().required(),
      price: joi.string().required(),
      sub_title: joi.string().required(),
      images: joi.array().items(joi.string().required())
    });
    joi.validate(req.body.item, schema, (err) => {
      if (err) return res.status(400).json({ error: err.details[0] });
      return next();
    });
  }
}
export default ItemValidator;
