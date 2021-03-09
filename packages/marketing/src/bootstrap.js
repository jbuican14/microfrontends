import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

// 1. Mount func
const mount = (divElem, { onNavigate, defaultHistory, initialPath }) => {
  // Default history is used when in the development
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, divElem);
  return {
    onParentNavigate({ pathname: nextPathname }) {
      // console.log('Container navigated to marketing');
      // console.log(location);

      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// 2. CHECK if in dev env
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// 3. RUN through container and export mount func
export { mount };
