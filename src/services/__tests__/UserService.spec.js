import models from '../../database/models';
import UserService from '../UserService';


const { User } = models;

describe('UserService', () => {
  describe('UserService.findOrCreateUser', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it('should create or return a user', async () => {
      jest.spyOn(User, 'findOrCreate').mockResolvedValue({
        id: 1,
        email: 'okello@gmail.com',
        firstName: 'Okello',
        lastName: 'Ronald',
        imageUrl: 'www.imgur.com',
        role: 'seller'
      });
      const result = await UserService.findOrCreateUser({});
  
      expect(result).toEqual({
        id: 1,
        email: 'okello@gmail.com',
        firstName: 'Okello',
        lastName: 'Ronald',
        imageUrl: 'www.imgur.com',
        role: 'seller'
      });
    });
  });
});
