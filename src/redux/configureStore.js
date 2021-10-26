import { createStore, combineReducers } from 'redux';
import { Campsites } from './campsites';            //  <== campsites reducer
import { Comments } from './comments';              //  <== comments reducer
import { Partners } from './partners';              //  <== partners reducer
import { Promotions } from './promotions';          //  <== promotions reducer


export const ConfigureStore = () => {
    // createStore requires a reducer as an argument, but it will only accept a single reducer.  So we are
    // going to combine our 4 reducers using the combineReducers function. 
    const store = createStore(
        combineReducers({
            campsites: Campsites,                   // <== campsites reducer
            comments: Comments,                     // <== comments reducer
            partners: Partners,                     // <== partners reducer
            promotions: Promotions                  // <== promotions reducer
        })
    );

    return store;
};