import { Op } from 'sequelize';
import models from '../database/models';
import RemoveDataValues from '../utils/removeDataValues';


const { User } = models;
class UserService {
  static async findOrCreateUser(userDetails) {
    let isNewUser = false;
    const findUser = await User.findOne({ where: { email: userDetails.email } });
    if (!findUser) {
      isNewUser = true;
    }
    const user = await User.findOrCreate({
      where: { email: { [Op.iLike]: `${userDetails.email}%` } },
      defaults: { ...userDetails }
    });
    const data = RemoveDataValues.removeDataValues(user);
    return { ...data, isNewUser };
  }

  static async updateUser(updateData, id) {
    const update = await User.update(
      { ...updateData },
      { where: { id } }
    );
    const data = RemoveDataValues.removeDataValues(update);
    return data;
  }
}
export default UserService;
