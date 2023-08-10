import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { browserHistory } from './browser-history.ts';
import HistoryRouter from './history-route/history-route.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ToastContainer/>
      <HistoryRouter history={ browserHistory }>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
