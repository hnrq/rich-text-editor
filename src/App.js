import React from "react";
import "./App.css";
import { Editor } from './DraftEditor';
import 'bootstrap/scss/bootstrap.scss';

const App = () => (
  <div className="App">
      <div className="editor">
        <Editor />
      </div>
  </div>
);

export default App;
