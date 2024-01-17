import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sageMiddleware = createSageMiddleware();

const enhancer = applyMiddleware(sageMiddleware);

const store = createStore(rootReducer, enhancer);

sageMiddleware.run(rootSaga);

export default store;