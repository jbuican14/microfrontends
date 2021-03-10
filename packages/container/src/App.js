import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Loading from './components/Loading';
import Header from './components/Header';
const MarketingLazyLoad = lazy(() => import('./components/MarketingApp'));
const AuthLazyLoad = lazy(() => import('./components/AuthApp'));
const DashboardLazyLoad = lazy(() => import('./components/DashboardApp'));

// Set up the prefix for naming class
// Prevent collision
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
    if (!isSignedIn && history.location.pathname === '/dashboard')
      history.push('/');
    return () => {};
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
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
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazyLoad />
              </Route>
              <Route path="/" component={MarketingLazyLoad} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

export default App;
