const rpn = jest.genMockFromModule('request-promise-native');


rpn.mockImplementation(() => new Promise((resolve, reject) => {
  resolve(
    `{
      email: okello@gmail.com,
      firstName: Okello,
      lastName: Ronald,
      imageUrl: www.imgur.com,
      role: seller
        }`
  );
}));

module.exports = rpn;
