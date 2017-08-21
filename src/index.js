import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';
import reducer from './reducers'
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';



const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const myStore = store(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk,logger)
));

render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
