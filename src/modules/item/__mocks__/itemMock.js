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

export const oneItem = [
  {
    item: {
      id: 9,
      name: 'Samsung Phones',
      subTitle: 'Sub title',
      description: 'Brand new LG phone straight from China',
      price: {
        from: 200000,
        to: 250000
      },
      images: [
        {
          id: 4,
          url: 'www.imgur.com',
          itemId: 9,
          createdAt: '2019-06-08T06:09:28.988Z',
          updatedAt: '2019-06-08T06:09:28.988Z'
        },
        {
          id: 5,
          url: 'www.cloudinary.com',
          itemId: 9,
          createdAt: '2019-06-08T06:09:28.988Z',
          updatedAt: '2019-06-08T06:09:28.988Z'
        },
        {
          id: 6,
          url: 'www.googlepics.com',
          itemId: 9,
          createdAt: '2019-06-08T06:09:28.988Z',
          updatedAt: '2019-06-08T06:09:28.988Z'
        }
      ]
    }
  }
];
export default item;
