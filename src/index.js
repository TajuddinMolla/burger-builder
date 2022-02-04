import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './store/rootReducer'
import thunk from 'redux-thunk';
import burgerBuilder from './store/reducers/burgerBuilder'
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/burger-builder">
        <App />
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

