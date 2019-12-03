import jwt from 'jsonwebtoken';
import Token from '../jwt-token';

describe('Token', () => {
  describe('Token.generateToken', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it('should generate a token with user data', async () => {
      jest.spyOn(jwt, 'sign').mockReturnValue('tokentoken');
      const result = await Token.generateToken({}, '240m');
      expect(result).toEqual('tokentoken');
    });
  });
  describe('Token.verifyToken', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });
    it('should decode a token containing user data', async () => {
      jest.spyOn(jwt, 'verify').mockReturnValue({ verify: 'verified' });
      const result = await Token.verifyToken('sffrNDWi8l', 'secret');
      expect(result).toEqual({ verify: 'verified' });
    });
  });
});
