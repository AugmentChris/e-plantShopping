import { describe, it, expect } from 'vitest';
import reducer, { addItem, removeItem, updateQuantity } from '../CartSlice';

const fern = { name: 'Boston Fern', image: 'x.jpg', cost: '$20' };

describe('cart slice', () => {
  it('adds a new item with quantity 1', () => {
    const state = reducer(undefined, addItem(fern));
    expect(state.items).toEqual([{ ...fern, quantity: 1 }]);
  });

  it('increments quantity when the same item is added again', () => {
    let state = reducer(undefined, addItem(fern));
    state = reducer(state, addItem(fern));
    expect(state.items[0].quantity).toBe(2);
  });

  it('updates quantity and removes items', () => {
    let state = reducer(undefined, addItem(fern));
    state = reducer(state, updateQuantity({ name: 'Boston Fern', quantity: 5 }));
    expect(state.items[0].quantity).toBe(5);
    state = reducer(state, removeItem(fern));
    expect(state.items).toEqual([]);
  });
});
