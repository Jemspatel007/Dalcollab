import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import { authReducer, userReducer } from './reducers/userReducers';
import { projectReducer } from './reducers/projectReducers';

const thunk = require('redux-thunk').thunk;

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    projects: projectReducer
})


const middlware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlware)))

export default store;