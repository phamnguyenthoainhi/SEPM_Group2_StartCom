import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

const initialState = {};

const middleWare = [thunk];

const store = createStore(rootReducer, initial)


