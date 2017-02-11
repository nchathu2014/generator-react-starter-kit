import {createStore,applyMiddleware} from 'redux';
import rootReducer from './../reducer/index';

export default function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState
  );
}
