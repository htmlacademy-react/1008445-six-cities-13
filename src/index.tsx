import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import { offers, fullOffers, reviews } from './mock/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={ offers } fullOffers={ fullOffers } reviews={ reviews }/>
  </React.StrictMode>
);
