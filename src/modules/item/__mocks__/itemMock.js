export const item = {
  item: {
    id: 17,
    name: 'Samsung Phones',
    description: 'Brand new LG phone straight from China',
    sellerId: 2,
    price: [
      {
        value: 200000,
        inclusive: true
      },
      {
        value: 250000,
        inclusive: false
      }
    ],
    updatedAt: '2019-06-08T07:34:57.718Z',
    createdAt: '2019-06-08T07:34:57.718Z'
  },
  imageResult: [
    {
      id: null,
      url: 'www.imgur.com',
      itemId: 17,
      createdAt: '2019-06-08T07:34:57.793Z',
      updatedAt: '2019-06-08T07:34:57.793Z'
    }
  ]
};

export const response = {
  status: jest
    .fn(() => ({
      json: jest.fn(() => {})
    }))
    .mockReturnValue({ json: jest.fn() })
};
export default item;
