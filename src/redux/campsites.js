import * as ActionTypes from './ActionTypes';

// This function takes in the existing "state" from the Redux store and updates that state, so the Redux store
// has the current state.

export const Campsites = (state = { isLoading: true, errMess: null, campsites: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []};
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};