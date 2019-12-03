import jwt from 'jsonwebtoken';

class Token {
  static async generateToken(payload, time) {
    const secret = process.env.SHOPPING_CART_SECRET;
    const token = await jwt.sign(payload, secret, { expiresIn: time });
    return token;
  }

  static async verifyToken(token) {
    const secret = process.env.SHOPPING_CART_SECRET;
    try {
      const decodedData = await jwt.verify(token, secret);
      return decodedData;
    } catch (error) {
      throw error;
    }
  }
}
export default Token;
