import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import { offers, fullOffers, reviews } from './mock/offers.ts';
import { Provider } from 'react-redux';
import { store } from './store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App
        offers={ offers }
        fullOffers={ fullOffers }
        reviews={ reviews }
      />
    </Provider>
  </React.StrictMode>
);
