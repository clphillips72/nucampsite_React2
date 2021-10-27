import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Campsites } from './campsites';            //  <== campsites reducer
import { Comments } from './comments';              //  <== comments reducer
import { Partners } from './partners';              //  <== partners reducer
import { Promotions } from './promotions';          //  <== promotions reducer
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    // createStore requires a reducer as an argument, but it will only accept a single reducer.  So we are
    // going to combine our 4 reducers using the combineReducers function. 
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};