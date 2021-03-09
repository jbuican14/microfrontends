import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Header from './components/Header';
import Loading from './components/Loading';
const MarketingLazyLoad = lazy(() => import('./components/MarketingApp'));
const AuthLazyLoad = lazy(() => import('./components/AuthApp'));

// Set up the prefix for naming class
// Prevent collision
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const App = () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/auth" component={AuthLazyLoad} />
              <Route path="/" component={MarketingLazyLoad} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
