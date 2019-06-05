import request from 'request-promise-native';
import UserService from '../../../services/UserService';
import Token from '../../../utils/jwt-token';
import AuthenticationController from '../AuthenticationController';

describe('AuthenticationController', () => {
  describe('AuthenticationController.loginUser', () => {
    let res;
    let req;
    beforeEach(() => {
      res = {
        status: jest.fn(() => ({
          json: jest.fn(() => { })
        })).mockReturnValue({ json: jest.fn() })
      };
      req = {
        body: {
          token: 'qwedcvfd',
          role: 'seller'
        }
      };
    });
    it('should login a user and return the user info and token', async () => {
      jest.spyOn(UserService, 'findOrCreateUser').mockResolvedValue(
        [{
          dataValues: {
            email: 'okello@gmail.com',
            firstName: 'Okello',
            lastName: 'Ronald',
            imageUrl: 'www.imgur.com',
            role: 'seller'
          }
        }]
      );
      jest.spyOn(Token, 'generateToken').mockImplementation();

      request.get = jest.fn().mockResolvedValue({
        email: 'okello@gmail.com',
        firstName: 'Okello',
        lastName: 'Ronald',
        imageUrl: 'www.imgur.com',
        role: 'seller'
      });
      const options = {
        url: 'https://oauth2.googleapis.com/tokeninfo?id_token=qwedcvfd',
        method: 'GET',
        json: true,
        headers: { 'content-type': 'application/json', }
      };
      await AuthenticationController.loginUser(req, res);
      expect(request).toBeCalledWith(options);
      expect(UserService.findOrCreateUser).toBeCalled();
      expect(Token.generateToken).toBeCalled();
    });
  });
});
