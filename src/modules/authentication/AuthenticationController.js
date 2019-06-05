import request from 'request-promise-native';
import UserService from '../../services/UserService';
import Token from '../../utils/jwt-token';


class AuthenticationController {
  static async loginUser(req, res) {
    try {
      const { token, role } = req.body;
      const options = {
        url: `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
        method: 'GET',
        json: true,
        headers: { 'content-type': 'application/json', }
    };
    const response = await request(options);
    const userInfo = {
      email: response.email,
      firstName: response.given_name,
      lastName: response.family_name,
      imageUrl: response.picture,
      role
    };
    const user = await UserService.findOrCreateUser(userInfo);
    const userData = user[0].dataValues;
    const jwt_token = await Token.generateToken(userData, '240m');
    return res.status(200).json({ ...userData, jwt_token }); 
    } catch (error) {
      return res.status(400).json({ error: error.message });
    } 
  }
}

export default AuthenticationController;