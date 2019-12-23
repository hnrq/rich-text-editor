import React from "react";
import "./App.css";
import 'bootstrap/scss/bootstrap.scss';
import { 
  BrowserRouter, 
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom';
import { Editor as SlateEditor } from 'SlateEditor';
import { Editor as DraftEditor } from 'DraftEditor';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/slate" component={SlateEditor} />
        <Route path="/draft" component={DraftEditor} />
        <Route exact path="/">
          <Redirect to="/draft" />
        </Route> 
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
