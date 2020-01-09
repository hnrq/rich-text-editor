import React from 'react';
import './App.css';
import 'bootstrap/scss/bootstrap.scss';
import { HashRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Editor as SlateEditor } from 'SlateEditor';
import { Editor as DraftEditor } from 'DraftEditor';
import configureStore from './store';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/draft">
              Draft
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/slate">
              Slate
            </NavLink>
          </li>
        </div>
      </nav>
      <div className="App">
        <Switch>
          <Route path="/slate" component={SlateEditor} />
          <Route path="/draft" component={DraftEditor} />
          <Route exact path="/">
            <Redirect to="/draft" />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  </Provider>
);

export default App;
