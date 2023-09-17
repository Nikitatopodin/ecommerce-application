import cart, {
  IInitialState,
  updateCartReducer,
} from '../redux/slices/cartSlice';
import { Cart } from '@commercetools/platform-sdk';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

const initialState: IInitialState = {
  cart: null,
};
const updatedCart: Cart = {
  id: 'cartId',
  version: 1,
  lineItems: [],
  customLineItems: [],
  totalPrice: {
    type: 'centPrecision',
    centAmount: 150,
    currencyCode: 'USD',
    fractionDigits: 1,
  },
  taxMode: 'Disabled',
  taxRoundingMode: 'HalfDown',
  taxCalculationMode: 'LineItemLevel',
  inventoryMode: 'None',
  cartState: 'Active',
  shippingMode: 'Multiple',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: 'Customer',
  createdAt: '',
  lastModifiedAt: '',
};

describe('cartSlice', () => {
  it('should return initial state when passed an empty action', () => {
    const result = cart(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });
  it('should update cart fields with "updateCart" action', () => {
    const action = {
      type: updateCartReducer.type,
      payload: { ...updatedCart },
    };
    const result = cart(initialState, action);
    expect(result.cart!.id).toBe('cartId');
    expect(result.cart!.totalPrice.centAmount).toBe(150);
  });
});
