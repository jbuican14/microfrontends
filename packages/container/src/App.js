import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Loading from './components/Loading';
import Header from './components/Header';
const MarketingLazyLoad = lazy(() => import('./components/MarketingApp'));
const AuthLazyLoad = lazy(() => import('./components/AuthApp'));

// Set up the prefix for naming class
// Prevent collision
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/auth">
                <AuthLazyLoad onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingLazyLoad} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
