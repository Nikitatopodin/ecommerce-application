import catalog, { addDataCatalog } from '../redux/slices/catalogSlice';
import { ICatalogData } from '../redux/slices/catalogSlice';

const initialState: ICatalogData = {
  dataProducts: [],
  dataAttributes: [],
  settings: {
    sort: null,
    currentCategory: '',
    filter: '',
    attributes: [],
    price: [0.3, 5],
    search: '',
    totalCards: 21,
    currentPage: 1,
    cardsOnPage: 10,
  },
};

const updatedCatalog: ICatalogData = {
  dataProducts: [
    {
      id: 'productId',
      version: 1,
      createdAt: '',
      lastModifiedAt: '',
      productType: {
        typeId: 'product-type',
        id: 'productId',
      },
      name: {
        'en-US': 'productName',
      },
      slug: {
        'en-US': 'productSlug',
      },
      categories: [],
      masterVariant: {
        id: 1,
      },
      variants: [],
    },
  ],
  dataAttributes: [],
  settings: {
    sort: null,
    currentCategory: '',
    filter: '',
    attributes: [],
    price: [0.3, 5],
    search: '',
    totalCards: 21,
    currentPage: 1,
    cardsOnPage: 10,
  },
};

describe('catalogSlice', () => {
  it('should return initial state when passed an empty action', () => {
    const result = catalog(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });
  it('should update cart fields with "updateCart" action', () => {
    const action = {
      type: addDataCatalog.type,
      payload: { ...updatedCatalog.dataProducts },
    };
    const result = catalog(initialState, action);
    expect(result.dataProducts[0].id).toBe('productId');
    expect(result.dataProducts[0].name['en-US']).toBe('productName');
    expect(result.dataProducts[0].slug['en-US']).toBe('productSlug');
  });
});
