import { Op } from 'sequelize';
import models from '../database/models';


const { User } = models;
class UserService {
  static async findOrCreateUser(userDetails) {
    const user = await User.findOrCreate({
      where: { email: { [Op.iLike]: `${userDetails.email}%` } },
      defaults: { ...userDetails }
    });
    return user;
  }
}
export default UserService;
