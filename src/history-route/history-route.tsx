import { BrowserHistory } from 'history';
import React, { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

export type THistoryRouterProps = {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
};

export default function HistoryRouter({ basename, children, history }: THistoryRouterProps) {
  const [ state, setState ] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [ history ]);
  return (
    <Router
      basename={ basename }
      location={ state.location }
      navigationType={ state.action }
      navigator={ history }
    >
      { children }
    </Router>
  );
}

