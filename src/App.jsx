import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Topbar from './components/Topbar';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}