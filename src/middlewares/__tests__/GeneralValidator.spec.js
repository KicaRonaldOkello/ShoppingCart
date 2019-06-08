import GeneralValidator from '../GeneralValidator';
import Token from '../../utils/jwt-token';

describe('GeneralValidator', () => {
  describe('GeneralValidator.verifyToken', () => {
    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });
    const nextMock = jest.fn();

    it('should return an error when method called without token', async () => {
      const req = { headers: { authorization: '' } };
      const res = {
        status() {
          return this;
        },
        json() {
          return {
            error: 'Please insert a token'
          };
        }
      };
      const result = await GeneralValidator.verifyToken(req, res, nextMock);
      expect(result.error).toEqual('Please insert a token');
      expect(nextMock).toBeCalledTimes(0);
    });
    it('should throw an error when the wrong token is entered', async () => {
      jest.spyOn(Token, 'verifyToken').mockRejectedValue(new Error('dummy error'));
      const req = { headers: { authorization: 'Axc43Lsw' } };
      const res = {
        status() {
          return this;
        },
        json() {
          return {
            error: 'Failed to authenticate token! Valid token required'
          };
        }
      };
      const result = await GeneralValidator.verifyToken(req, res, nextMock);
      expect(result.error).toEqual('Failed to authenticate token! Valid token required');
      expect(nextMock).toBeCalledTimes(0);
    });
    it('should decode the token', async () => {
      const req = { headers: { authorization: 'Axc43Lsw' } };
      jest.spyOn(Token, 'verifyToken').mockResolvedValue({
        id: 2,
        firstName: 'Eric',
        lastName: 'Ebulu Ochol',
        imageUrl: 'https:///fKObi6Dvcv0/s96-c/photo.jpg',
        email: 'eric@gmail.com',
        role: 'seller'
      });
      await GeneralValidator.verifyToken(req, 'res', nextMock);
      expect(nextMock).toBeCalledTimes(1);
      expect(req.currentUser.firstName).toEqual('Eric');
    });
  });
  describe('GeneralValidator.verifySeller', () => {
    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });
    const nextMock = jest.fn();
    it('should return an error message if verified user is not a seller', () => {
      const req = { currentUser: { role: 'buyer' } };
      const res = {
        status() {
          return this;
        },
        json() {
          return {
            error: 'You are not authorized to perform this action'
          };
        }
      };
      const result = GeneralValidator.verifySeller(req, res, nextMock);
      expect(result.error).toEqual('You are not authorized to perform this action');
      expect(nextMock).toBeCalledTimes(0);
    });
    it('should should call next method once user is verified as seller', () => {
      const req = { currentUser: { role: 'seller' } };
      GeneralValidator.verifySeller(req, 'res', nextMock);
      expect(nextMock).toBeCalledTimes(1);
    });
  });
});
