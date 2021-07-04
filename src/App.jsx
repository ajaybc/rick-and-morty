import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import Topbar from './components/Topbar';
import Home from './pages/Home';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Topbar />
          <Container maxWidth="lg" style={{paddingTop: '20px'}}>
            <Switch>
              <Route path="/">
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </HelmetProvider>
  );
}