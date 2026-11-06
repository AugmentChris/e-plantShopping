# Paradise Nursery — React Plant Shop

A shopping-cart storefront for houseplants, built with **React** and **Redux Toolkit**.

### ▶ [Live demo](https://augmentchris.github.io/e-plantShopping/)

## Features

- **Landing page** with an About Us section and a "Get Started" entry point
- **Product catalog** of 30 plants in 5 categories, each with an image, description, and price
- **Add to cart** — the button switches to "Added to Cart" once the item is in the cart, and turns back on if you remove it
- **Live cart badge** in the navbar showing the total item count
- **Cart page** — increase or decrease quantities (going below 1 removes the item), delete items, and see per-item and overall totals
- **Checkout** — clears the cart and shows an order confirmation (demo only, no payment)

## How it works

| Piece | Role |
|---|---|
| `src/CartSlice.jsx` | Redux Toolkit slice with `addItem`, `removeItem`, and `updateQuantity` reducers |
| `src/store.js` | Configures the Redux store |
| `src/ProductList.jsx` | Catalog grid, navbar, and cart badge; reads cart state with `useSelector` |
| `src/CartItem.jsx` | Cart view: quantity controls, totals, checkout |
| `src/AboutUs.jsx` | Landing-page copy |

Cart state lives in a single Redux store, so the badge, the product buttons, and the cart page always agree.

## Tech stack

React 18 · Redux Toolkit · React-Redux · Vite · Vitest · Testing Library · GitHub Actions · GitHub Pages

## Running locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

The tests are Vitest + Testing Library: reducer unit tests plus UI tests that click through adding to the cart, changing quantities, deleting items, and checking out. CI runs lint and the tests before every deploy.

Every push to `main` builds and deploys the site to GitHub Pages through GitHub Actions.
