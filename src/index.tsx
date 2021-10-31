import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faUnderline,
  faBold,
  faItalic,
  faCode,
  faListOl,
  faListUl,
  faHeading,
  faQuoteLeft,
  fas,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fas,
  faUnderline,
  faBold,
  faItalic,
  faCode,
  faListOl,
  faListUl,
  faHeading,
  faQuoteLeft,
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
