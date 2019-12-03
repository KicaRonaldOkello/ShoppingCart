import models from '../../database/models';
import UserService from '../UserService';
import { userMock } from '../__mocks__/itemMocks';


const { User } = models;

describe('UserService', () => {
  describe('UserService.findOrCreateUser', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it('should create a new user', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue();
      jest.spyOn(User, 'findOrCreate').mockResolvedValue(userMock);
      const result = await UserService.findOrCreateUser({});

      expect(result).toEqual({ ...userMock, isNewUser: true });
    });

    it('should return an already existing user', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(userMock);
      jest.spyOn(User, 'findOrCreate').mockResolvedValue(userMock);
      const result = await UserService.findOrCreateUser({});

      expect(result).toEqual({ ...userMock, isNewUser: false });
    });
  });
  describe('UserService.updateUser', () => {
    it('should update user details', async () => {
      jest.spyOn(User, 'update').mockResolvedValue({ ...userMock, isNewUser: false });
      await UserService.updateUser({}, 1);
      expect(User.update).toHaveBeenCalled();
    });
  });
});
