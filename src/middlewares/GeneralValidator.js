import Token from '../utils/jwt-token';


class GeneralValidator {
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({ error: 'Please insert a token' });
    }

    try {
      const decoded = await Token.verifyToken(token);
      req.currentUser = decoded;
      next();
    } catch (error) {
      return res.status(400).json({
        error: 'Failed to authenticate token! Valid token required'
      });
    }
  }

  static verifySeller(req, res, next) {
    const { currentUser: { role } } = req;
    if (role === 'seller') return next();
    return res.status(400).json({
      error: 'You are not authorized to perform this action'
    });
  }
}
export default GeneralValidator;
