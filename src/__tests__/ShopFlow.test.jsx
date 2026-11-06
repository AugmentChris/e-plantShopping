import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../CartSlice';
import ProductList from '../ProductList';

const renderShop = () => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  render(<Provider store={store}><ProductList /></Provider>);
  return store;
};

const cartLink = () => screen.getByLabelText(/^Cart,/);
const openCart = () => fireEvent.click(cartLink());

afterEach(cleanup);

describe('shopping flow', () => {
  it('renders all five categories with prices', () => {
    renderShop();
    for (const c of ['Air Purifying Plants', 'Aromatic Fragrant Plants', 'Insect Repellent Plants', 'Medicinal Plants', 'Low Maintenance Plants']) {
      expect(screen.getByText(c)).toBeTruthy();
    }
    expect(screen.getAllByRole('button', { name: 'Add to Cart' }).length).toBe(30);
  });

  it('adds to cart, disables the button, and updates the badge', () => {
    renderShop();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);
    // Snake Plant is listed in two categories; both listings reflect the cart.
    const added = screen.getAllByRole('button', { name: 'Added to Cart' });
    expect(added.length).toBe(2);
    expect(added.every(b => b.disabled)).toBe(true);
    expect(cartLink().getAttribute('aria-label')).toBe('Cart, 1 items');
  });

  it('cart controls change quantities and totals', () => {
    renderShop();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]); // Snake Plant $15
    openCart();
    expect(screen.getByText('Total Cart Amount: $15.00')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByText('Total Cart Amount: $30.00')).toBeTruthy();
    expect(cartLink().getAttribute('aria-label')).toBe('Cart, 2 items');
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    expect(screen.getByText('Your cart is empty.')).toBeTruthy();
  });

  it('delete removes the item and re-enables Add to Cart', () => {
    renderShop();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);
    openCart();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Continue Shopping' }));
    expect(screen.getAllByRole('button', { name: 'Add to Cart' }).length).toBe(30);
  });

  it('checkout clears the cart and confirms the order', () => {
    const store = renderShop();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0]);
    openCart();
    fireEvent.click(screen.getByRole('button', { name: 'Checkout' }));
    expect(screen.getByText('Thank you! Your order has been placed.')).toBeTruthy();
    expect(store.getState().cart.items).toEqual([]);
  });
});
