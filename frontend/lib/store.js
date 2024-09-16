import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

// import { authReducer, userReducer } from './reducers/userReducers';
import { authReducer, userReducer } from '@/reducers/userReducers';
// import { authReducer, userReducer } from './../';
// import { getAdsReducer, updateAdsReducer } from './reducers/adReducers';

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
})


const middlware = [thunk];
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlware)))
const store = createStore(reducer, applyMiddleware(thunk))

export default store;