import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// import './index.css';

// 1. Mount func
const mount = (divElem) => {
  ReactDOM.render(<App />, divElem);
};

// 2. CHECK if in dev env
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// 3. RUN through container and export mount func
export { mount };
